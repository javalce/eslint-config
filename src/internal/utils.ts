type ResolvedOptions<T> = T extends boolean ? never : NonNullable<T>;

export function resolveSubOptions<T, K extends keyof T>(options: T, key: K): ResolvedOptions<T[K]> {
  return typeof options[key] === 'boolean'
    ? ({} as ResolvedOptions<T[K]>)
    : ((options[key] ?? {}) as ResolvedOptions<T[K]>);
}

export function isEnabled<T>(options: T, key: keyof T, defaultValue = false): boolean {
  const option = options[key];

  if (option === undefined) return defaultValue;
  if (typeof option === 'boolean') return option;

  return true;
}
