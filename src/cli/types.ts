import type { FRAMEWORKS, TESTING_FRAMEWORKS } from './constants';

export interface Logger {
  error: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  info: (...args: unknown[]) => void;
  success: (...args: unknown[]) => void;
  log: (...args: unknown[]) => void;
  break: () => void;
}

export type Framework = (typeof FRAMEWORKS)[keyof typeof FRAMEWORKS];

export type TestingFramework = (typeof TESTING_FRAMEWORKS)[keyof typeof TESTING_FRAMEWORKS];

export interface Config {
  framework: Framework | null;
  testing: TestingFramework | null;
  type: 'lib' | 'app';
}
