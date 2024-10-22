import fs from 'node:fs/promises';
import path from 'node:path';

import { detect } from '@antfu/ni';
import { execa } from 'execa';
import ora from 'ora';

import { handleError } from './handle-error';

export async function isPackageTypeModule(): Promise<boolean> {
  const packageJson = await getPackageJson();

  return packageJson.type === 'module';
}

export async function getPackageManager(): Promise<'npm' | 'yarn' | 'pnpm' | 'bun'> {
  const packageManager = await detect({ programmatic: true, cwd: process.cwd() });

  if (packageManager === 'yarn@berry') return 'yarn';
  if (packageManager === 'pnpm@6') return 'pnpm';
  if (packageManager === 'bun') return 'bun';

  return packageManager ?? 'npm';
}

export async function installDependencies(deps: string[]): Promise<void> {
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

export async function getPackageJson(): Promise<Record<string, unknown>> {
  try {
    const packageJson = await fs.readFile(path.join(process.cwd(), 'package.json'), 'utf-8');

    return JSON.parse(packageJson) as Record<string, unknown>;
  } catch {
    handleError('The package.json file was not found');
  }

  return {};
}
