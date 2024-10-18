import type { Config, Framework, TestingFramework } from '../types';

import fs from 'node:fs/promises';

import chalk from 'chalk';
import { Command } from 'commander';
import { execa } from 'execa';
import ora from 'ora';
import prompts from 'prompts';

import { DEPENDENCIES_MAP, FRAMEWORK_OPTIONS, TESTING_FRAMEWORK_OPTIONS } from '../constants';
import { handleError } from '../utils/handle-error';
import { logger } from '../utils/logger';
import { getPackageManager, isPackageTypeModule } from '../utils/npm-utils';

export const init = new Command()
  .name('init')
  .description('Create a new ESLint config in your project')
  .action(async () => {
    try {
      const options: Config = await prompts([
        {
          type: 'select',
          name: 'framework',
          message: 'Select the framework want you use',
          choices: FRAMEWORK_OPTIONS,
        },
        {
          type: 'select',
          name: 'testing',
          message: 'Select the testing framework you use',
          choices: TESTING_FRAMEWORK_OPTIONS,
        },
      ]);

      const { framework, testing } = options;

      // Get the dependencies required for the selected config
      const deps = getDependencies(framework, testing);

      // Display the dependencies
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

function getDependencies(framework: Framework | null, testing: TestingFramework | null): string[] {
  const spinner = ora('Collecting dependencies...').start();
  const deps = new Set<string>(['eslint', '@javalce/eslint-config']);

  if (framework) {
    DEPENDENCIES_MAP[framework].forEach((dep) => deps.add(dep));
    if (framework === 'next') {
      DEPENDENCIES_MAP.react.forEach((dep) => deps.add(dep));
    }
  }

  if (testing) {
    DEPENDENCIES_MAP[testing].forEach((dep) => deps.add(dep));
  }

  if (framework && ['react', 'next', 'vue'].includes(framework)) {
    DEPENDENCIES_MAP['testing-library'].forEach((dep) => deps.add(dep));
  }

  spinner.succeed();

  return Array.from(deps);
}

async function installDependencies(deps: string[]): Promise<void> {
  const packageManager = await getPackageManager();
  const spinner = ora('Installing dependencies...').start();

  try {
    await execa(packageManager, [packageManager === 'npm' ? 'install' : 'add', '-D', ...deps]);
    spinner.succeed();
  } catch (error) {
    spinner.fail();
    handleError(error);
  }
}

async function writeEslintConfig({ framework, testing }: Config): Promise<void> {
  const isESMModule = await isPackageTypeModule();
  const configFilename = isESMModule ? 'eslint.config.mjs' : 'eslint.config.js';

  let config = `import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
`;

  if (framework) {
    if (['react', 'vue', 'solid'].includes(framework)) {
      config += `  typescript: ['tsconfig.node.json', 'tsconfig.app.json'],\n`;
    }

    config += framework === 'next' ? `  react: 'next',\n` : `  ${framework}: true,\n`;
  }

  if (testing) {
    config += `  testing: '${testing}',\n`;
  }

  if (framework === null) {
    config += `  type: 'lib',\n`;
  }

  config += `});`;

  await fs.writeFile(configFilename, config);
}
