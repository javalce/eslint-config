import type { Framework, TestingFramework } from '../types';

import fs from 'node:fs/promises';

import chalk from 'chalk';
import { Command, createArgument } from 'commander';
import ora from 'ora';

import { DEPENDENCIES_MAP, FRAMEWORKS, TESTING_FRAMEWORKS } from '../constants';
import { getEslintConfigPath } from '../utils/get-eslint-config';
import { handleError } from '../utils/handle-error';
import { logger } from '../utils/logger';
import { getPackageJson, installDependencies } from '../utils/npm-utils';

export const add = new Command()
  .name('add')
  .description('Add a new config to your project')
  .addArgument(
    createArgument(
      'config',
      'The config for the framework you want to add to your project',
    ).choices(Object.values({ ...FRAMEWORKS, ...TESTING_FRAMEWORKS })),
  )
  .action(async (framework: Framework | TestingFramework) => {
    await ensureEslintIsInstalled();

    await checkEslintConfigFile(framework);

    const deps = getDependencies(framework);

    logger.info(`The ${chalk.magentaBright(framework)} config needs the following dependencies:`);
    logger.break();
    logger.log(chalk.blueBright(deps.join(' ')));
    logger.break();

    await installDependencies(deps);

    logger.info('You can now enable the config in your ESLint configuration file.');
  })
  .showHelpAfterError();

async function checkEslintConfigFile(framework: Framework | TestingFramework): Promise<void> {
  const spinner = ora('Checking ESLint config file...').start();
  const eslintConfigFile = getEslintConfigPath();
  const content = await fs.readFile(eslintConfigFile, 'utf-8');
  const lines = content.split('\n');

  const configLine = lines.find((line) =>
    framework === 'jest' || framework === 'vitest'
      ? line.includes('testing')
      : line.includes(framework),
  );

  if (configLine?.includes(framework) || !configLine?.includes(`${framework}: false`)) {
    spinner.fail();
    handleError(
      `The config for ${chalk.redBright(framework)} is already enabled in your ESLint config.`,
    );

    return;
  }

  spinner.succeed();
}

async function ensureEslintIsInstalled(): Promise<void> {
  const spinner = ora('Checking ESLint installation...').start();
  const packageJson = await getPackageJson();

  const deps = Object.keys(packageJson.devDependencies ?? {});

  if (!deps.includes('eslint')) {
    spinner.fail();
    handleError('ESLint is not installed in your project');
  }

  if (!deps.includes('@javalce/eslint-config')) {
    spinner.fail();
    handleError('The config for the framework you want to add requires @javalce/eslint-config');
  }

  spinner.succeed();
}

function getDependencies(framework: Framework | TestingFramework): string[] {
  const spinner = ora('Collecting dependencies...').start();
  const deps = new Set<string>();

  DEPENDENCIES_MAP[framework].forEach((dep) => deps.add(dep));

  if (['react', 'next', 'vue'].includes(framework)) {
    DEPENDENCIES_MAP['testing-library'].forEach((dep) => deps.add(dep));
  }

  spinner.succeed();

  return Array.from(deps);
}
