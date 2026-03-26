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

This package supports React 18 and React 19. Your application must provide matching `react` and `react-dom` peer dependencies.

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

This library supports both React 18 (`^18.3.1`) and React 19 (`^19.2.4`) as peer dependencies. The library is built as ESM with React externalized, meaning it does not bundle React and relies on the consumer's installed React version.

**Known Limitation:** During development and testing, we use React 18 type definitions even when testing against React 19 runtime. This is due to a transitive dependency type incompatibility in the Storybook ecosystem:

```
@storybook/addon-essentials
  → @storybook/addon-docs
    → @mdx-js/mdx
      → @types/mdx (does not support React 19 types)
```

Since Storybook is dev-only, this limitation does not affect the shipped library. Runtime compatibility with React 19 is fully validated during the build process.

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
