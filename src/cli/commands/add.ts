import type { Framework, TestingFramework } from '../types';

import fs from 'node:fs/promises';
import path from 'node:path';

import chalk from 'chalk';
import { Command, createArgument } from 'commander';
import { execa } from 'execa';
import { loadPackageJSON } from 'local-pkg';
import ora from 'ora';

import { DEPENDENCIES_MAP, FRAMEWORKS, TESTING_FRAMEWORKS } from '../constants';
import { findEslintConfigFile } from '../utils/get-eslint-config';
import { handleError } from '../utils/handle-error';
import { logger } from '../utils/logger';
import { getPackageManager } from '../utils/npm-utils';

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

    const eslintConfigFile = findEslintConfigFile();

    if (!eslintConfigFile) {
      handleError('ESLint config file not found');

      return;
    }

    await checkEslintConfigFile(eslintConfigFile, framework);

    const deps = getDependencies(framework);

    logger.info(`The ${chalk.magentaBright(framework)} config needs the following dependencies:`);
    logger.break();
    logger.log(chalk.blueBright(deps.join(' ')));
    logger.break();

    await installDependencies(deps);

    logger.info('You can now enable the config in your ESLint configuration file.');
  })
  .showHelpAfterError();

async function checkEslintConfigFile(
  eslintConfigFile: string,
  framework: Framework | TestingFramework,
): Promise<void> {
  const spinner = ora('Checking ESLint config file...').start();
  const content = await fs.readFile(path.resolve(process.cwd(), eslintConfigFile), 'utf-8');
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
  const packageJson = await loadPackageJSON();

  if (!packageJson) {
    spinner.fail();
    handleError(`The ${chalk.redBright.bold('package.json')} file was not found`);

    return;
  }

  if (!packageJson.devDependencies) {
    spinner.fail();
    handleError('Missing devDependencies in your package.json');

    return;
  }

  const deps = Object.keys(packageJson.devDependencies);

  if (!deps.includes('eslint')) {
    spinner.fail();
    handleError('ESLint is not installed in your project');
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
