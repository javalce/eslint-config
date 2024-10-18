import { Command } from 'commander';
import { getPackageInfo } from 'local-pkg';

import { add } from './commands/add';
import { init } from './commands/init';
import { handleError } from './utils/handle-error';

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));

async function main(): Promise<void> {
  const packageInfo = await getPackageInfo('@javalce/eslint-config');

  const program = new Command()
    .name(packageInfo?.name ?? '')
    .description('A CLI tool for managing your ESLint config')
    .helpOption('-h, --help', 'Display this help message')
    .version(packageInfo?.version ?? '', '-v, --version', 'Display the current version');

  program.addCommand(init).addCommand(add);

  program.parse();
}

export function runCli(): void {
  main().catch(handleError);
}
