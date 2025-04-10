import type { TypedConfigItem } from '../../types';

import variablesConfig from '../variables';

// These share identical configuration options, so we want to keep them in sync.

const noUnusedVarsConfig = variablesConfig.rules?.['no-unused-vars'];

const config: TypedConfigItem = {
  name: 'typescript/rules/extension',
  rules: {
    /**
     * Require default parameters to be last.
     *
     * 🚫 Not fixable - https://typescript-eslint.io/rules/default-param-last/
     */
    '@typescript-eslint/default-param-last': 'error',
    /**
     * Disallow creation of functions within loops.
     *
     * 🚫 Not fixable - https://typescript-eslint.io/rules/no-loop-func/
     */
    '@typescript-eslint/no-loop-func': 'error',
    /**
     * Disallow unused variables.
     *
     * 🚫 Not fixable - https://typescript-eslint.io/rules/no-unused-vars/
     */
    '@typescript-eslint/no-unused-vars': noUnusedVarsConfig,
    /**
     * Disallow unnecessary constructors.
     *
     * 🚫 Not fixable - https://typescript-eslint.io/rules/no-useless-constructor/
     */
    '@typescript-eslint/no-useless-constructor': 'error',
  },
};

export default config;
