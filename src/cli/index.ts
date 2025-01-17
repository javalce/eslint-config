import { Command } from '@commander-js/extra-typings';

import packageJson from '../../package.json';

import { add } from './commands/add';
import { init } from './commands/init';

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));

function main(): void {
  const program = new Command()
    .name(packageJson.name)
    .description('A CLI tool for managing your ESLint config')
    .helpOption('-h, --help', 'Display this help message')
    .version(packageJson.version, '-v, --version', 'Display the current version');

  program.addCommand(init).addCommand(add);

  program.parse();
}

export function runCli(): void {
  main();
}
