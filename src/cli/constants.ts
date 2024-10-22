import type { Choice } from 'prompts';
import type { Framework, TestingFramework } from './types';

export const FRAMEWORKS = {
  REACT: 'react',
  NEXT: 'next',
  VUE: 'vue',
  SVELTE: 'svelte',
  SOLIDJS: 'solidjs',
  ASTRO: 'astro',
} as const;

export const FRAMEWORK_OPTIONS: Choice[] = [
  {
    title: 'None',
    value: null,
  },
  {
    title: 'React',
    value: FRAMEWORKS.REACT,
  },
  {
    title: 'Next.js',
    value: FRAMEWORKS.NEXT,
  },
  {
    title: 'Vue',
    value: FRAMEWORKS.VUE,
  },
  {
    title: 'Svelte',
    value: FRAMEWORKS.SVELTE,
  },
  {
    title: 'SolidJS',
    value: FRAMEWORKS.SOLIDJS,
  },
  {
    title: 'Astro',
    value: FRAMEWORKS.ASTRO,
  },
];

export const TESTING_FRAMEWORKS = {
  JEST: 'jest',
  VITEST: 'vitest',
} as const;

export const TESTING_FRAMEWORK_OPTIONS: Choice[] = [
  {
    title: 'None',
    value: null,
  },
  {
    title: 'Jest',
    value: TESTING_FRAMEWORKS.JEST,
  },
  {
    title: 'Vitest',
    value: TESTING_FRAMEWORKS.VITEST,
  },
];

export const DEPENDENCIES_MAP: Record<Framework | TestingFramework | 'testing-library', string[]> =
  {
    [FRAMEWORKS.REACT]: [
      'eslint-plugin-react',
      'eslint-plugin-react-hooks',
      'eslint-plugin-jsx-a11y',
    ],
    [FRAMEWORKS.NEXT]: [
      'eslint-plugin-react',
      'eslint-plugin-react-hooks',
      'eslint-plugin-jsx-a11y',
      '@next/eslint-plugin-next',
    ],
    [FRAMEWORKS.VUE]: ['eslint-plugin-vue', 'vue-eslint-parser'],
    [FRAMEWORKS.SVELTE]: ['eslint-plugin-svelte', 'svelte-eslint-parser'],
    [FRAMEWORKS.SOLIDJS]: ['eslint-plugin-solid'],
    [FRAMEWORKS.ASTRO]: ['eslint-plugin-astro', 'astro-eslint-parser', 'eslint-plugin-jsx-a11y'],
    [TESTING_FRAMEWORKS.JEST]: ['eslint-plugin-jest'],
    [TESTING_FRAMEWORKS.VITEST]: ['@vitest/eslint-plugin'],
    'testing-library': ['eslint-plugin-testing-library'],
  };
