// NOTE: This file is necessary to enable unit tests to run from this directory only,
//  as well as enable ESLint's import/resolver to work.
// When Jest runs, it sets BABEL_ENV=test and/or NODE_ENV=test in the env and
//  automatically looks for a Babel config to use.

const configs = require('../../babel.config');

module.exports = {
  ...configs,
  plugins: [
    ...(configs.plugins || []),
    '@babel/plugin-transform-runtime',
  ]
};
