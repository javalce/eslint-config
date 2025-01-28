import type { Config, Framework, TestingFramework } from '../types';

import fs from 'node:fs/promises';

import chalk from 'chalk';
import { Command, createOption } from 'commander';
import ora from 'ora';
import prompts from 'prompts';

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

export const init = new Command()
  .name('init')
  .description('Create a new ESLint config in your project')
  .addOption(
    createOption('-f, --framework <framework>', 'The framework you want to use').choices(
      Object.values(FRAMEWORKS),
    ),
  )
  .addOption(
    createOption('-t, --testing <testing>', 'The testing framework you want to use').choices(
      Object.values(TESTING_FRAMEWORKS),
    ),
  )
  .addOption(createOption('--no-testing', 'Skip the testing framework selection').default(false))
  .addOption(createOption('--lib', 'Create a config for a library project').default(false))
  .action(async (args) => {
    const framework = args.framework ?? (await getFrameworkSelection());
    const testing =
      args.testing === false ? null : (args.testing ?? (await getTestingFrameworkSelection()));

    const options: Config = {
      framework,
      testing,
      lib: args.lib,
    } as Config;

    try {
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

      // Write the ESLint config
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
    if (['react', 'vue', 'solid'].includes(framework) && framework !== 'next') {
      config += `  typescript: ['tsconfig.node.json', 'tsconfig.app.json'],\n`;
    }

    config += framework === 'next' ? `  react: 'next',\n` : `  ${framework}: true,\n`;
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
