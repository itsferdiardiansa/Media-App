import js from '@eslint/js';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import jestPlugin from 'eslint-plugin-jest';
import securityPlugin from 'eslint-plugin-security';

export default [
  // js.configs.recommended,
  {
    files: [
      "apps/{api,clients}/*/src/**/*.ts",
      "packages/**/*.ts"
    ],
    ignores: [
      "**/*.spec.*",
      "**/__tests__/**",
      "/*",
      ".*",
      "node_modules/**",
    ],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd()
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        process: 'readonly',
        module: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      jest: jestPlugin,
      security: securityPlugin
    },
    rules: {
      // TypeScript Best Practices
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-shadow': ['error'],
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/consistent-type-assertions': 'error',

      // NestJS Best Practices
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'interface', format: ['PascalCase'], prefix: ['I'] }
      ],
      '@typescript-eslint/no-parameter-properties': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // Security Best Practices
      'security/detect-non-literal-fs-filename': 'warn',
      'security/detect-object-injection': 'off',
      'security/detect-unsafe-regex': 'warn',

      // Code Consistency and Quality
      'eqeqeq': ['error', 'always'],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-else-return': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' }
      ],

      // Jest Rules for Testing
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/consistent-test-it': ['error', { fn: 'it' }],
      'jest/no-conditional-expect': 'warn',
      'jest/no-done-callback': 'error'
    }
  }
];
