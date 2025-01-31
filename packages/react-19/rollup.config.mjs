import path from 'node:path';
import { createRequire } from 'node:module';
import css from 'rollup-plugin-import-css';
import resolve from '@rollup/plugin-node-resolve';
import cjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import ts from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';

const require = createRequire(import.meta.url);
const babelConfig = require(
  path.resolve(import.meta.dirname, './babel.config.js')
);

const input = path.resolve(
  import.meta.dirname,
  './src/components//Dialog/Dialog.tsx'
);
const output = {
  file: path.resolve(import.meta.dirname, './dist/index.mjs'),
  format: 'esm',
  sourcemap: true,
};

export default [
  //// source
  {
    input,
    output,
    plugins: [
      json(),
      css({ inject: true }), // `inject` causes CSS to be bundled in the JS bundle!
      resolve(),
      cjs(),
      ts({ tsconfig: path.resolve(import.meta.dirname, './tsconfig.json') }),
      babel({
        // NOTE: the `configFile` option to specify the path to the Babel config file to load
        //  __DOES NOT WORK__; it doesn't load the file; the only sure way to load the correct
        //  options is to explicitly load the file ourselves and pass all the options in
        ...babelConfig,

        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        presets: ['@babel/preset-react'],
      }),
    ],
  },

  //// types
  {
    input,
    output: {
      ...output,
      file: output.file.replace(/index\.\w+$/, 'index.d.ts'),
    },
    plugins: [
      css(), // TODO: unfortunately, this causes a CSS bundle to be emitted for no purpose in a DTS build; should get rid of this somehow
      dts({ tsconfig: path.resolve(import.meta.dirname, './tsconfig.json') }),
    ],
  },
];
