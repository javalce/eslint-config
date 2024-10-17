import { Command, createOption } from 'commander';
import { z } from 'zod';

import { FRAMEWORKS, TESTING_FRAMEWORKS } from '../constants';
import { handleError } from '../utils/handle-error';

const initOptionsSchema = z.object({
  frameworks: z.array(z.nativeEnum(FRAMEWORKS)).optional(),
  testing: z.nativeEnum(TESTING_FRAMEWORKS).optional(),
  projectType: z.enum(['app', 'lib']).optional(),
});

export const init = new Command()
  .name('init')
  .description('Initialize a new project')
  .addOption(
    createOption('-f, --frameworks <frameworks...>', 'Select the frameworks to use').choices(
      Object.values(FRAMEWORKS),
    ),
  )
  .addOption(
    createOption('-t, --testing <testing>', 'Select the testing framework to use').choices(
      Object.values(TESTING_FRAMEWORKS),
    ),
  )
  .addOption(createOption('--app, --application', 'Set the project type to application'))
  .addOption(createOption('--lib, --library', 'Set the project type to library').conflicts('app'))
  .action(async (opts) => {
    const { success, data: options, error } = await initOptionsSchema.safeParseAsync(opts);

    if (!success) {
      handleError(error);
    }
  });
