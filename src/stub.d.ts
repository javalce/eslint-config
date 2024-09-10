declare module 'eslint-plugin-react' {
  export const configs: {
    flat: {
      recommended: unknown;
      all: unknown;
      'jsx-runtime': unknown;
    };
  };
}

declare module 'eslint-plugin-react-hooks' {
  export const configs: {
    recommended: {
      plugins: string[];
      rules: Record<string, unknown>;
    };
  };
}

declare module 'eslint-plugin-jsx-a11y' {
  export const configs: {
    recommended: unknown;
    strict: unknown;
  };

  export const flatConfigs: {
    recommended: unknown;
    strict: unknown;
  };
}

declare module '@next/eslint-plugin-next' {
  export const configs: {
    recommended: {
      rules: Record<string, unknown>;
    };
  };
}

declare module 'eslint-plugin-jest' {
  export const configs: {
    all: unknown;
    recommended: unknown;
    style: unknown;
    'flat/all': unknown;
    'flat/recommended': unknown;
    'flat/style': unknown;
  };
}

declare module 'eslint-plugin-testing-library' {
  export const configs: {
    'flat/react': unknown;
  };
}
