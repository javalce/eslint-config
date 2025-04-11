import type { Config, Framework, TestingFramework } from '../types';

import chalk from 'chalk';
import { Command, createOption } from 'commander';
import fs from 'fs-extra';
import ora from 'ora';
import prompts from 'prompts';
import { z } from 'zod';

import {
  DEPENDENCIES_MAP,
  FRAMEWORK_OPTIONS,
  FRAMEWORKS,
  TESTING_FRAMEWORK_OPTIONS,
  TESTING_FRAMEWORKS,
} from '../constants';
import { handleError } from '../utils/handle-error';
import { logger } from '../utils/logger';
import { installDependencies, isPackageTypeModule } from '../utils/npm-utils';

const initOptionsSchema = z.object({
  framework: z.nativeEnum(FRAMEWORKS).optional(),
  testing: z.nativeEnum(TESTING_FRAMEWORKS).optional(),
  lib: z.boolean(),
});

export const init = new Command()
  .name('init')
  .description('Create a new ESLint config in your project')
  .addOption(
    createOption('--framework <framework>', 'Specify the framework to use').choices(
      Object.values(FRAMEWORKS),
    ),
  )
  .addOption(
    createOption('--testing <testing>', 'Specify the testing framework to use').choices(
      Object.values(TESTING_FRAMEWORKS),
    ),
  )
  .addOption(createOption('--lib', 'Create a config for a library project').default(false))
  .action(async (opts) => {
    try {
      const parsedInitOptions = initOptionsSchema.parse(opts);

      const framework = parsedInitOptions.framework ?? (await getFrameworkSelection());

      const testing = parsedInitOptions.testing ?? (await getTestingFrameworkSelection());

      const options = {
        framework,
        testing,
        lib: parsedInitOptions.lib,
      } satisfies Config;

      const deps = getDependencies(framework, testing);

      logger.info("The config that you've selected requires the following dependencies:");
      logger.break();
      logger.log(chalk.blue(deps.join(' ')));
      logger.break();

      const { confirm } = (await prompts({
        type: 'confirm',
        name: 'confirm',
        message: 'Do you want to install these dependencies?',
        initial: true,
      })) as { confirm: boolean };

      if (confirm) {
        await installDependencies(deps);
      }

      await writeEslintConfig(options);
    } catch (error) {
      handleError(error);
    }
  });

async function getTestingFrameworkSelection(): Promise<TestingFramework | null> {
  const { testing } = (await prompts(
    {
      type: 'select',
      name: 'testing',
      message: 'Select the testing framework you use',
      choices: TESTING_FRAMEWORK_OPTIONS,
      initial: 0,
    },
    {
      onCancel: () => {
        logger.error('Command aborted');
        process.exit(1);
      },
    },
  )) as { testing: TestingFramework | null };

  return testing;
}

async function getFrameworkSelection(): Promise<Framework> {
  const { framework } = (await prompts(
    {
      type: 'select',
      name: 'framework',
      message: 'Select the framework want you use',
      choices: FRAMEWORK_OPTIONS,
      initial: 0,
    },
    {
      onCancel: () => {
        logger.error('Command aborted');
        process.exit(1);
      },
    },
  )) as { framework: Framework };

  return framework;
}

function getDependencies(framework: Framework, testing: TestingFramework | null): string[] {
  const spinner = ora('Collecting dependencies...').start();
  const deps = new Set<string>(['eslint', '@javalce/eslint-config']);

  if (framework !== 'node') {
    if (framework === 'next') {
      DEPENDENCIES_MAP.react.forEach((dep) => deps.add(dep));
    }

    DEPENDENCIES_MAP[framework].forEach((dep) => deps.add(dep));
  }

  if (testing) {
    DEPENDENCIES_MAP[testing].forEach((dep) => deps.add(dep));

    if (['react', 'next', 'vue'].includes(framework)) {
      DEPENDENCIES_MAP['testing-library'].forEach((dep) => deps.add(dep));
    }
  }

  spinner.succeed();

  return Array.from(deps);
}

async function writeEslintConfig({ framework, testing, lib }: Config): Promise<void> {
  const isESMModule = await isPackageTypeModule();
  const configFilename = isESMModule ? 'eslint.config.js' : 'eslint.config.mjs';

  let config = `import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
`;

  if (framework !== 'node') {
    const hasTsEslintConfig = await fs.exists('tsconfig.eslint.json');
    const hasTsAppConfig = await fs.exists('tsconfig.app.json');
    const hasTsNodeConfig = await fs.exists('tsconfig.node.json');

    if (!hasTsEslintConfig && hasTsAppConfig && hasTsNodeConfig) {
      config += `  typescript: ['tsconfig.node.json', 'tsconfig.app.json'],\n`;
    }

    if (framework === 'next') {
      config += '  react: true,\n';
    }

    config += `  ${framework}: true,\n`;
  }

  if (testing) {
    config += `  testing: '${testing}',\n`;
  }

  if (lib) {
    config += `  type: 'lib'\n`;
  }
  config += '});';

  await fs.writeFile(configFilename, config);
}
