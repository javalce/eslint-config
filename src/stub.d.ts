declare module 'eslint-plugin-react' {
  export const configs: {
    flat: {
      recommended: any;
      all: any;
      'jsx-runtime': any;
    };
  };
}

declare module 'eslint-plugin-react-hooks' {
  export const configs: {
    recommended: {
      plugins: string[];
      rules: Record<string, any>;
    };
  };
}

declare module 'eslint-plugin-jsx-a11y' {
  export const configs: {
    recommended: any;
    strict: any;
  };

  export const flatConfigs: {
    recommended: any;
    strict: any;
  };
}

declare module '@next/eslint-plugin-next' {
  export const configs: {
    recommended: {
      rules: Record<string, any>;
    };
  };
}
