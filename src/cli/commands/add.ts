import type { Framework, TestingFramework } from '../types';

import fs from 'node:fs/promises';

import { Command, createArgument } from '@commander-js/extra-typings';
import chalk from 'chalk';
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
  .action(async (framework) => {
    await ensureEslintIsInstalled();

    const deps = getDependencies(framework);

    if (!(await validateDependenciesPresence(framework, deps))) {
      logger.info(`The ${chalk.magentaBright(framework)} config needs the following dependencies:`);
      logger.break();
      logger.log(chalk.blueBright(deps.join(' ')));
      logger.break();

      await installDependencies(deps);

      logger.info('You can now enable the config in your ESLint configuration file.');
    }

    await validateEslintConfig(framework);
  })
  .showHelpAfterError();

async function validateDependenciesPresence(
  framework: Framework | TestingFramework,
  dependencies: string[],
): Promise<boolean> {
  const spinner = ora('Checking dependencies...').start();
  const packageJson = await getPackageJson();
  const deps = [
    ...Object.keys(packageJson.devDependencies ?? {}),
    ...Object.keys(packageJson.dependencies ?? {}),
  ];

  const missingDeps = dependencies.filter((dep) => !deps.includes(dep));

  if (missingDeps.length === 0) {
    spinner.succeed(
      `All dependencies for the ${chalk.redBright(framework)} config are already installed.`,
    );

    return true;
  }

  spinner.succeed();

  return true;
}

async function validateEslintConfig(framework: Framework | TestingFramework): Promise<void> {
  const spinner = ora('Checking ESLint configuration...').start();
  const eslintConfigFile = getEslintConfigPath();
  const content = await fs.readFile(eslintConfigFile, 'utf-8');
  const lines = content.split('\n');

  const configLine = lines.find((line) =>
    framework === 'jest' || framework === 'vitest'
      ? line.includes('testing')
      : line.includes(framework),
  );

  if (configLine === undefined || configLine.includes(`${framework}: false`)) {
    spinner.warn(
      `The ${chalk.redBright(framework)} config is not enabled in your ESLint configuration file. Remember to enable it.`,
    );

    return;
  }

  spinner.succeed(
    `The ${chalk.redBright(framework)} config is already enabled in your ESLint configuration file.`,
  );
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
