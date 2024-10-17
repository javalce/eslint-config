import { Command } from 'commander';

import { logger } from '../utils/logger';

export const init = new Command()
  .name('init')
  .description('Initialize a new project')
  .action(() => {
    logger.info('Initializing project...');
  });
