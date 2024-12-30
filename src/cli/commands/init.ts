import type { Config, Framework, TestingFramework } from '../types';

import fs from 'node:fs/promises';

import chalk from 'chalk';
import { Command } from 'commander';
import ora from 'ora';
import prompts from 'prompts';

import { DEPENDENCIES_MAP, FRAMEWORK_OPTIONS, TESTING_FRAMEWORK_OPTIONS } from '../constants';
import { handleError } from '../utils/handle-error';
import { logger } from '../utils/logger';
import { installDependencies, isPackageTypeModule } from '../utils/npm-utils';

export const init = new Command()
  .name('init')
  .description('Create a new ESLint config in your project')
  .action(async () => {
    try {
      const frameworkOptions: Omit<Config, 'type'> = await prompts(
        [
          {
            type: 'select',
            name: 'framework',
            message: 'Select the framework want you use',
            choices: FRAMEWORK_OPTIONS,
            initial: 0,
          },
          {
            type: 'select',
            name: 'testing',
            message: 'Select the testing framework you use',
            choices: TESTING_FRAMEWORK_OPTIONS,
            initial: 0,
          },
        ],
        {
          onCancel: () => {
            logger.error('Command aborted');
            process.exit(1);
          },
        },
      );

      const typeOptions: Pick<Config, 'type'> = await prompts(
        {
          type: () => (frameworkOptions.framework === null ? 'select' : null),
          name: 'type',
          message: 'Select the type of project',
          choices: [
            { title: 'Library', value: 'lib' },
            { title: 'Application', value: 'app' },
          ],
          initial: 1,
        },
        {
          onCancel: () => {
            logger.error('Command aborted');
            process.exit(1);
          },
        },
      );

      const options = {
        ...frameworkOptions,
        ...typeOptions,
      } as Config;

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
  }

  if (testing) {
    DEPENDENCIES_MAP[testing].forEach((dep) => deps.add(dep));

    if (framework && ['react', 'next', 'vue'].includes(framework)) {
      DEPENDENCIES_MAP['testing-library'].forEach((dep) => deps.add(dep));
    }
  }

  spinner.succeed();

  return Array.from(deps);
}

async function writeEslintConfig({ framework, testing, type: projectType }: Config): Promise<void> {
  const isESMModule = await isPackageTypeModule();
  const configFilename = isESMModule ? 'eslint.config.js' : 'eslint.config.mjs';

  let config = `import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
`;

  if (framework) {
    if (['react', 'vue', 'solid'].includes(framework) && framework !== 'next') {
      config += `  typescript: ['tsconfig.node.json', 'tsconfig.app.json'],\n`;
    }

    config += framework === 'next' ? `  react: 'next',\n` : `  ${framework}: true,\n`;
  }

  if (testing) {
    config += `  testing: '${testing}',\n`;
  }

  if (projectType === 'lib') {
    config += `  type: '${projectType}'\n`;
  }
  config += '});';

  await fs.writeFile(configFilename, config);
}
