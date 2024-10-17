export interface Logger {
  error: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  info: (...args: unknown[]) => void;
  success: (...args: unknown[]) => void;
  break: () => void;
}
