const RULES = {
  OFF: 'off',
  WARN: 'warn',
  ERROR: 'error',
};
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-console': RULES.OFF,
    'react/function-component-definition': RULES.OFF,
    'default-param-last': RULES.OFF,
    'arrow-body-style': RULES.OFF,
    'react/prop-types': RULES.OFF,
    'react/react-in-jsx-scope': RULES.OFF,
    'import/prefer-default-export': RULES.OFF,
  },
};
