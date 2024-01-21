[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/dso-toolkit/dso-toolkit) [![npm version](http://img.shields.io/npm/v/dso-toolkit.svg)](https://npmjs.org/package/dso-toolkit "View this project on npm") [![Build status master branch](https://img.shields.io/travis/com/dso-toolkit/dso-toolkit/master)](https://travis-ci.com/dso-toolkit/dso-toolkit)

- [Slack chat](https://dso-toolkit.slack.com/)
- [Slack chat invite link](https://join.slack.com/t/dso-toolkit/shared_invite/zt-58125gbo-FtPAARcnU47rMgkT7KWikA)

# DSO Toolkit - Design System of the Digitaal Stelsel Omgevingswet (DSO)

(Digitaal Stelsel Omgevingswet, translated, stands for Digital System for the Environment and Planning Act of the Netherlands)

The DSO Toolkit consists of documentation and a style guide. In addition, two implementations are provided: CSS and Web Components. The Web Components for Angular and React get wrappers, see issue #915.

## Getting started

Zie https://www.dso-toolkit.nl voor actuele documentatie.

### NPM registry

```
npm install dso-toolkit --save-dev
```

#### Bundle CSS

Import or bundle `dso-toolkit/dist/dso.css`.

### CDN

The toolkit and component library are distributed to dso-toolkit.nl. Use the table below to resolve the branch/channel to the base url:

| branch      | channel    | url                                   |
| ----------- | ---------- | ------------------------------------- |
| master      | stable     | `https://cdn.dso-toolkit.nl/master/`  |
| _tags only_ | _releases_ | `https://cdn.dso-toolkit.nl/VERSION/` |

The same goes for the component library:

| branch      | channel    | url                                   |
| ----------- | ---------- | ------------------------------------- |
| master      | stable     | `https://www.dso-toolkit.nl/master/`  |
| _tags only_ | _releases_ | `https://www.dso-toolkit.nl/VERSION/` |

```html
<link rel="stylesheet" href="https://cdn.dso-toolkit.nl/dso-toolkit/[master|VERSION]/dist/dso.css" />

or minified:

<link rel="stylesheet" href="https://cdn.dso-toolkit.nl/dso-toolkit/[master|VERSION]/dist/dso.min.css" />
```

For Web Components:

```html
<script type="module" src="https://cdn.dso-toolkit.nl/[master|VERSION]/core/dso-toolkit.esm.js"></script>
<script nomodule src="https://cdn.dso-toolkit.nl/[master|VERSION]/core/dso-toolkit.js"></script>
```

The referenced scripts are very small: Only the actually used Web Components are lazy loaded. For more information: https://stenciljs.com/docs/distribution

### Develop or mockups

To work on the DSO Toolkit using components and variants or create mockups of pages, forms or components you need Node 20 and Yarn. See [CONTRIBUTING.md](CONTRIBUTING.md) on how to contribute.

Either install Yarn with

```
npm install --global yarn
```

or use Yarn with `npx`:

```
npx yarn <<<my commands here>>>
```

```
git clone git@github.com:dso-toolkit/dso-toolkit.git
cd dso-toolkit
yarn install
```

### Environments

Depending on the work being done, development can be done in several environments:

#### `development`

This environment is used to develop new components in Storybook. Storybook is built around stories and since this project has multiple Storybooks (one for each implementation).

The easiest way to start this environment is with one of the following commands:

```
yarn start
yarn start --react
yarn start --angular
yarn start --all
```

This will run the corresponding Storybook(s). Since these commands contain a colon (`:`), these commands can be run from anywhere in the project.

The following processes are started:

- **default**: CSS in watch mode, Stencil in watch mode, Storybook and Cypress
- **--react**: CSS in watch mode, Stencil in watch mode, Storybook for React components
- **--angular**: CSS in watch mode, Stencil in watch mode, Storybook for Angular components
- **--all**: CSS in watch mode, Stencil in watch mode, Storybook, and Storybook for React and Angular components

This will start Stencil on http://localhost:45333, Storybook on http://localhost:45000 and the Cypress GUI. Since Stencil and Storybook are running it's possible to develop the components, but keep in mind the tests run in a production environment: This means no Stencil development tools like HMR.

## Requirements

Node 20. For development on the DSO Toolkit you also need Yarn.

## Ports

Ports used during development:

- 43300 - Docusaurus
- 45333 - Stencil
- 45000 - Storybook for HTML/CSS + Web Components
- 45600 - Storybook for React components
- 46006 - Storybook for Angular Components
