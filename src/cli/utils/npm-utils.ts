import { detect } from '@antfu/ni';
import { loadPackageJSON } from 'local-pkg';

export async function isPackageTypeModule(): Promise<boolean> {
  const packageJson = await loadPackageJSON();

  return packageJson?.type === 'module';
}

export async function getPackageManager(): Promise<'npm' | 'yarn' | 'pnpm' | 'bun'> {
  const packageManager = await detect({ programmatic: true, cwd: process.cwd() });

  if (packageManager === 'yarn@berry') return 'yarn';
  if (packageManager === 'pnpm@6') return 'pnpm';
  if (packageManager === 'bun') return 'bun';

  return packageManager ?? 'npm';
}
