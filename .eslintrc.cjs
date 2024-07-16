module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "api.ts"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh",  'import'],
  rules: {
    "@typescript-eslint/no-explicit-any": ["off"],
    "react-refresh/only-export-components": ["off"],
    'import/extensions': ['error', 'ignorePackages', {
      ts: 'always',
      tsx: 'always',
    }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  }
  
};
