//
// ROOT ESLint Configuration
//

/* eslint-env node */

import js from '@eslint/js';
import globals from 'globals';
import babel from '@babel/eslint-plugin';
import babelParser from '@babel/eslint-parser';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jest from 'eslint-plugin-jest';
import jestDom from 'eslint-plugin-jest-dom';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import testingLibrary from 'eslint-plugin-testing-library';

const ecmaVersion = 'latest';
const impliedStrict = true;
const tsconfigRootDir = import.meta.dirname;

//
// Plugins
//

// Plugins that apply to ALL envs
const basePlugins = {
  '@babel': babel, // @see https://www.npmjs.com/package/@babel/eslint-plugin
};

const importPluginExtensions = [
  '.js',
  '.jsx',
  '.cts',
  '.mjs',
  '.ts',
  '.tsx',
  '.cts',
  '.mts',
];
const importPluginSettings = {
  // @see https://www.npmjs.com/package/eslint-plugin-import
  'import/resolver': {
    // @see https://www.npmjs.com/package/eslint-import-resolver-alias
    alias: {
      // also config eslint.config.mjs, tsconfig.json, and jest.config.mjs
      map: [
        // ['^testingUtility$', './tools/tests/testingUtility.ts']
      ],
      extensions: importPluginExtensions,
    },

    // @see https://www.npmjs.com/package/eslint-import-resolver-node
    node: {
      extensions: importPluginExtensions,
      moduleDirectory: ['node_modules', 'src/', 'tools/'],
    },

    // @see https://www.npmjs.com/package/eslint-import-resolver-typescript
    typescript: {
      alwaysTryTypes: true,
    },
  },
};

//
// Globals
//

// Globals that apply to ALL envs
const baseGlobals = {
  // anything in addition to what `languageOptions.ecmaVersion` provides
  // @see https://eslint.org/docs/latest/use/configure/language-options#predefined-global-variables
};

// Globals for repo tooling scripts
const toolingGlobals = {
  ...globals.node,
};

// Globals for browser-based source code
const browserGlobals = {
  ...globals.browser,
};

// Globals for test files
const testGlobals = {
  ...globals.jest,

  // `globals.browser` defines this global but it's also part of the `testing-library`
  //  API so needs to be overwritable to avoid ESLint's `no-redeclare` rule
  screen: 'off',
};

// Globals for BUNDLED (Webpack, Rollup, etc) source code
// NOTE: these must also be defined in <repo>/src/globals.d.ts referenced in the
//  <repo>/tsconfig.json as well as the `globals` property in <repo>/jest.config.mjs
const bundlerGlobals = {
  WP_BUILD_ENV: 'readonly',
};

//
// Base rules
// @see http://eslint.org/docs/rules/RULE-NAME
//

const baseRules = {
  ...js.configs.recommended.rules,
  'no-regex-spaces': 'off',
  'no-await-in-loop': 'error',
  'no-async-promise-executor': 'error',
  'no-misleading-character-class': 'error',
  'no-unsafe-optional-chaining': 'error',

  //// Best practices

  curly: 'error',
  'default-case': 'error',
  eqeqeq: 'error',
  'guard-for-in': 'error',
  'no-alert': 'error',
  'no-caller': 'error',
  'no-console': 'off', // this is just a demo app
  'no-else-return': 'error',
  'no-eq-null': 'error',
  'no-eval': 'error',
  'no-lone-blocks': 'error',
  'no-loop-func': 'error',
  'no-multi-spaces': 'error',
  'no-new': 'off',
  'no-new-func': 'error',
  'no-new-wrappers': 'error',
  'no-throw-literal': 'error',
  'no-warning-comments': [
    'error',
    {
      terms: ['DEBUG', 'FIXME', 'HACK'],
      location: 'start',
    },
  ],

  //// Strict mode

  strict: ['error', 'function'],

  //// Variables

  'no-catch-shadow': 'error',
  'no-shadow': 'error',
  'no-unused-vars': [
    'error',
    {
      args: 'none',
      caughtErrors: 'none',
      vars: 'local',
    },
  ],
  'no-use-before-define': 'error',

  //// Stylistic issues

  // NONE: Prettier will take care of these by reformatting the code on commit,
  //  save a few exceptions.

  // Prettier will format using single quotes per .prettierrc.js settings, but
  //  will not require single quotes instead of backticks/template strings
  //  when interpolation isn't used, so this rule will catch those cases
  quotes: [
    'error',
    'single',
    {
      avoidEscape: true,
      allowTemplateLiterals: false,
    },
  ],

  //// ECMAScript 6 (non-stylistic issues only)

  'no-duplicate-imports': ['error', { includeExports: true }],
  'no-useless-constructor': 'error',
  'no-var': 'error',
  'prefer-const': 'error',
};

//
// Tooling-specific rules
//

const toolingRules = {
  'no-console': 'off', // OK in repo scripts
};

//
// React-specific rules
//

const reactRules = {
  ...react.configs.flat.recommended.rules,
  ...react.configs.flat['jsx-runtime'].rules,

  // not needed because we don't pre-compile React code, it just runs in the browser
  'react/react-in-jsx-scope': 'off',

  // PropTypes are deprecated and will be removed in React 19
  // @see https://react.dev/blog/2024/04/25/react-19-upgrade-guide#removed-proptypes-and-defaultprops
  'react/forbid-foreign-prop-types': 'off',
  'react/prop-types': 'off',

  //// React-Hooks Plugin

  // default is 'warn', prefer errors (warnings just get ignored)
  'react-hooks/exhaustive-deps': 'error',
};

//
// TypeScript-specific rules
//

const typescriptRules = {
  ...typescript.configs['recommended-type-checked'].rules,

  // AFTER TypeScript rules to turn off `import` rules that TypeScript covers
  ...importPlugin.flatConfigs.typescript.rules,
};

//
// Test-specific rules
//

const testRules = {
  //// jest plugin

  'jest/no-disabled-tests': 'error',
  'jest/no-focused-tests': 'error',
  'jest/no-identical-title': 'error',
  'jest/valid-expect': 'error',
  'jest/valid-title': 'error',

  //// jest-dom plugin

  // this rule is buggy, and doesn't seem to work well with the Testing Library's queries
  'jest-dom/prefer-in-document': 'off',

  //// testing-library plugin

  // this prevents expect(document.querySelector('foo')), which is useful because not
  //  all elements can be found using RTL queries (sticking to RTL queries probably
  //  means less fragile tests, but then there are things we wouldn't be able to
  //  test like whether something renders in Light mode or Dark mode as expected)
  'testing-library/no-node-access': 'off',

  // we use custom queries, which don't get added to `screen` (that's a miss in RTL, IMO),
  //  which means we _must_ destructure the result from `render()` in order to get to
  //  our custom queries
  'testing-library/prefer-screen-queries': 'off',

  // not much value in this one, and it's not sophisticated enough to detect all usage
  //  scenarios so we get false-positives
  'testing-library/await-async-utils': 'off',
};

//
// Config generators
//

/**
 * Project scripts.
 * @param {boolean} isModule
 * @param {boolean} isTypescript Ignored if `isModule=false`
 * @returns {Object} ESLint config.
 */
const createToolingConfig = (isModule = true, isTypescript = false) => ({
  files: isModule
    ? isTypescript
      ? ['**/*.{ts,mts}']
      : ['**/*.{js,mjs}']
    : ['**/*.{js,cjs}'],
  ignores: ['src/**/*.*', 'tools/tests/**/*.*'],
  plugins: {
    ...basePlugins,
    ...(isModule ? { import: importPlugin } : {}),
    ...(isTypescript ? { '@typescript-eslint': typescript } : {}),
  },
  languageOptions: {
    ecmaVersion,
    parser: isTypescript ? typescriptParser : babelParser,
    parserOptions: {
      sourceType: isModule ? 'module' : 'script',
      ...(isModule && isTypescript
        ? {
            project: true,
            tsconfigRootDir,
          }
        : {}),
      ecmaFeatures: {
        impliedStrict,
        jsx: false,
      },
    },
    globals: {
      ...baseGlobals,
      ...toolingGlobals,
    },
  },
  settings: {
    ...(isModule ? importPluginSettings : {}),
  },
  rules: {
    ...baseRules,
    ...toolingRules,
    ...(isModule ? importPlugin.flatConfigs.recommended.rules : {}), // BEFORE TypeScript rules
    ...(isModule && isTypescript ? typescriptRules : {}),
  },
});

/**
 * JavaScript source files.
 * @param {boolean} isReact If source will include JSX code.
 * @returns ESLint config.
 */
const createSourceJSConfig = (isReact = false) => ({
  files: isReact ? ['src/**/*.{js,jsx}'] : ['src/**/*.js'],
  plugins: {
    ...basePlugins,
    import: importPlugin,
    ...(isReact ? { react, 'react-hooks': reactHooks } : {}),
  },
  languageOptions: {
    ecmaVersion,
    parser: babelParser,
    parserOptions: {
      ...(isReact
        ? react.configs.flat['jsx-runtime'].languageOptions.parserOptions
        : {}),
      sourceType: 'module',
      ecmaFeatures: {
        ...(isReact
          ? react.configs.flat['jsx-runtime'].languageOptions.parserOptions
              .ecmaFeatures
          : {}),
        impliedStrict,
        jsx: isReact,
      },
    },
    globals: {
      ...baseGlobals,
      ...bundlerGlobals,
      ...browserGlobals,
    },
  },
  settings: {
    ...importPluginSettings,
    ...(isReact
      ? {
          react: {
            // a version must be specified; here it's set to detect the current version
            version: 'detect',
          },
        }
      : {}),
  },
  rules: {
    ...baseRules,
    ...importPlugin.flatConfigs.recommended.rules,
    ...(isReact ? reactRules : {}),
  },
});

const createSourceTSConfig = (isReact = false) => ({
  files: isReact ? ['src/**/*.tsx'] : ['src/**/*.ts'],
  plugins: {
    ...basePlugins,
    import: importPlugin,
    '@typescript-eslint': typescript,
    ...(isReact ? { react, 'react-hooks': reactHooks } : {}),
  },
  languageOptions: {
    ecmaVersion,
    parser: typescriptParser,
    parserOptions: {
      ...(isReact
        ? react.configs.flat['jsx-runtime'].languageOptions.parserOptions
        : {}),
      project: true,
      tsconfigRootDir,
      sourceType: 'module',
      ecmaFeatures: {
        ...(isReact
          ? react.configs.flat['jsx-runtime'].languageOptions.parserOptions
              .ecmaFeatures
          : {}),
        impliedStrict,
        jsx: isReact,
      },
    },
    globals: {
      ...baseGlobals,
      ...bundlerGlobals,
      ...browserGlobals,
    },
  },
  settings: {
    ...importPluginSettings,
    ...(isReact
      ? {
          react: {
            // a version must be specified; here it's set to detect the current version
            version: 'detect',
          },
        }
      : {}),
  },
  rules: {
    ...baseRules,
    ...importPlugin.flatConfigs.recommended.rules, // BEFORE TypeScript rules
    ...typescriptRules,
    ...(isReact ? reactRules : {}),
  },
});

const createTestConfig = (isTypescript = false) => ({
  files: isTypescript
    ? [
        'src/**/__tests__/**/?(*.)+(spec|test).{ts,tsx}',
        'tools/tests/**/*.{ts,tsx}',
      ]
    : [
        'src/**/__tests__/**/?(*.)+(spec|test).{js,jsx}',
        'tools/tests/**/*.{js,jsx}',
      ],
  plugins: {
    ...basePlugins,
    import: importPlugin,
    ...(isTypescript ? { '@typescript-eslint': typescript } : {}),
    jest,
    'jest-dom': jestDom,
    'testing-library': testingLibrary,
    react,
    'react-hooks': reactHooks,
  },
  languageOptions: {
    ecmaVersion,
    parser: isTypescript ? typescriptParser : babelParser,
    parserOptions: {
      ...react.configs.flat['jsx-runtime'].languageOptions.parserOptions,
      ...(isTypescript
        ? {
            project: true,
            tsconfigRootDir,
          }
        : {}),
      sourceType: 'module',
      ecmaFeatures: {
        ...react.configs.flat['jsx-runtime'].languageOptions.parserOptions
          .ecmaFeatures,
        impliedStrict,
        jsx: true,
      },
    },
    globals: {
      ...baseGlobals,
      ...bundlerGlobals, // because tests execute code that also gets bundled
      ...browserGlobals,
      ...testGlobals,
    },
  },
  settings: {
    ...importPluginSettings,
    react: {
      // a version must be specified; here it's set to detect the current version
      version: 'detect',
    },
  },
  rules: {
    ...baseRules,
    ...importPlugin.flatConfigs.recommended.rules, // BEFORE TypeScript rules
    ...(isTypescript ? typescriptRules : {}),
    ...reactRules,
    ...testRules,
  },
});

export default [
  // Ignores
  {
    ignores: [
      // third-party
      '**/node_modules/',
      // build output
      'dist/**',
      // test output
      'coverage/**',
    ],
  },

  // Tooling Configs
  createToolingConfig(false), // CJS scripts
  createToolingConfig(true), // ESM scripts
  createToolingConfig(true, true), // TS scripts

  // Source Configs
  createSourceJSConfig(), // Plain JS source
  createSourceJSConfig(true), // React JS source
  createSourceTSConfig(), // Plain TS source
  createSourceTSConfig(true), // React TS source

  // Test Configs
  createTestConfig(), // JS tests
  createTestConfig(true), // TS tests

  // Prettier
  // ALWAYS LAST: disable style rules that conflict with prettier
  // @see https://typescript-eslint.io/troubleshooting/formatting#suggested-usage---prettier
  {
    plugins: {
      prettier,
    },
    rules: prettier.rules,
  },
];
