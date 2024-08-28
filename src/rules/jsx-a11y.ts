import { type Linter } from 'eslint';

import { type TypedConfigItem } from '../types';

/**
 * These are enabled by `jsx-a11y/recommended`, but we've made the decision to
 * disable them.
 */
const disabledRules: Linter.RulesRecord = {
  'jsx-a11y/click-events-have-key-events': 'off',
  // This rule has been deprecated, but not yet removed.
  // 'jsx-a11y/no-onchange': 'off',
  'jsx-a11y/no-static-element-interactions': 'off',
};

const config: TypedConfigItem = {
  name: 'javalce/react/jsx-a11y',
  rules: {
    ...disabledRules,
  },
};

export default config;
