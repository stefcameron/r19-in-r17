# r19-in-r17

A prototype monorepo to explore the challenges of async-loading a React 19-based component (`<Dialog />`), provided from a library package ([react-19](./packages/react-19/)) built with Rollup, into a React 17-based [app](./packages/react-17/) built with Webpack.

## Installation

Use the latest `node` and `pnpm` executables, and run `pnpm install` from the repo root.

## Running

1. Run `pnpm build` to build all the packages in dependency order.
2. Run the `react-17` app.

Running `pnpm start` from the repo root will do all of the above and open a browser to the __react-17__ app running on port `3000`.

The `react-19` app can be run on its own by running `pnpm start:19` from the repo root. A browser will open to the app running on port `3001`.

## Scripts

```bash
# installs all dependencies
$ pnpm install
# builds all packages and opens a browser to localhost:3000
# set PORT=XXXX in env to run on a different port
$ pnpm start

# formats the code using Prettier
$ pnpm run fmt
# builds the production bundle
$ pnpm run build
```

> 💬 If your browser doesn't open, please open it manually to `localhost:3000`

## Testing

```bash
# checks formatting, linting, build, and tests
$ pnpm run test
# runs unit tests only
$ pnpm run test:unit
# full format check (style, lint, typings)
$ pnpm run lint
# runs Prettier in verification mode only
$ pnpm run fmt:check
# formats the code and then checks for lint errors
$ pnpm run verify
```
