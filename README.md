# MatrixUI Library

MatrixUI Library is a comprehensive UI component library built with React and TypeScript. It provides a wide range of reusable components to help you build modern and responsive user interfaces.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the MatrixUI Library, use npm or yarn:

The intended peer support is React 18 and React 19. Your application must provide matching `react` and `react-dom` versions; consumer verification is pending as described below.

```sh
npm install @trsys-tech/matrix-library
```

or

```sh
yarn add @trsys-tech/matrix-library
```

## Usage

```jsx
import { Button } from "@trsys-tech/matrix-library";

function App() {
  return <Button variant="primary">Click Me</Button>;
}
```

## Components

MatrixUI Library includes a variety of components, such as:

- Buttons
- Modals
- Forms
- Tabs
- Toasts
- And many more...

For a full list of components and their usage, please refer to the [Storybook](https://trsys-tech.github.io/matrix-library/) documentation.

### React Version Support

The intended consumer matrix is:

| Runtime peers (`react` and `react-dom`) | Consumer types (`@types/react` and `@types/react-dom`) | Verification |
| --- | --- | --- |
| `^18.3.1` | 18 | Pending packed-consumer checks (T04) |
| `^19.2.4` | 19 | Pending packed-consumer checks (T04) |

The build externalizes React. Development and Storybook currently use React 18 types, including in the React 19 build job, as a development dependency workaround. A successful library build does not establish consumer type or runtime compatibility. Do not release the widened peer range until T04 verifies both rows.

The package is ESM-only. The previous manifest advertised a CommonJS `require` entry, but the build did not emit it. The maintainer confirmed no known consumers need CommonJS. Removing that advertised entry is a breaking contract change: publish it in a major version, and migrate any CommonJS consumer to an ESM `import` (or dynamic `import()` where appropriate) before upgrading. No release is performed as part of this change.

## Development

To set up the development environment, clone the repository and install the dependencies:

```sh
git clone https://github.com/Trsys-Tech/matrix-library.git
cd matrix-library
npm install
```

## Contributing

We welcome contributions to the MatrixUI Library! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details. MatrixUI Library

## Testing

Use Node.js 24 and run `npm ci`, then install Chromium with `npx playwright install chromium` (on Linux CI, use `npx playwright install --with-deps chromium`).

- `npm test` type-checks the test files, then runs Node Vitest tests and headless Storybook tests.
- `npm run test:unit` runs Node Vitest tests without a browser; `npm run test:unit:watch` watches them. New tests belong under `src` or `tests` as `*.test.ts(x)` or `*.spec.ts(x)`.
- `npm run test:storybook` runs the stories selected by `.storybook/main.ts` in headless Chromium; `npm run test:storybook:watch` watches them. Story interactions belong in their stories. Browser-only pointer checks that need native CSS hover live in `tests/browser`.

`npm run test:typecheck` checks all Node and browser test files under strict TypeScript settings. Its configuration skips checking dependency declarations because the installed browser dependencies use declarations incompatible with TypeScript 5.6; project test and source code remain checked. The Node suite contains all 59 migrated cases. Accessibility checks remain advisory while findings are reviewed.
