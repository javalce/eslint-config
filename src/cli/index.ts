#!/usr/bin/env node
import { Command } from 'commander';

import { add } from './commands/add';
import { init } from './commands/init';
import { getPackageInfo } from './utils/get-package-info';
import { logger } from './utils/logger';

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));

async function main(): Promise<void> {
  const packageInfo = getPackageInfo();

  const program = new Command()
    .name(packageInfo.name ?? '')
    .description('A CLI tool for managing your ESLint config')
    .helpOption('-h, --help', 'Display this help message')
    .version(packageInfo.version ?? '', '-v, --version', 'Display the current version');

  program.addCommand(init).addCommand(add);

  await program.parseAsync();
}

main().catch(logger.error);
