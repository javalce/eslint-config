import { Command } from 'commander';

import { logger } from '../utils/logger';

export const add = new Command()
  .name('add')
  .description('Add a new config to your project')
  .argument('[config...]', 'Config to add')
  .action((config: string[]) => {
    logger.info('Adding config:', config);
  });
