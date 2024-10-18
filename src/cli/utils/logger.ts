/* eslint-disable no-console -- This is a CLI */

import type { Logger } from '../types';

import chalk from 'chalk';

export const logger: Logger = {
  error: (...args: unknown[]) => {
    console.error(chalk.red(...args));
  },
  warn: (...args: unknown[]) => {
    console.warn(chalk.yellow(...args));
  },
  info: (...args: unknown[]) => {
    console.info(chalk.cyan(...args));
  },
  success: (...args: unknown[]) => {
    console.log(chalk.green(...args));
  },
  log: (...args: unknown[]) => {
    console.log(...args);
  },
  break: () => {
    console.log('');
  },
};
