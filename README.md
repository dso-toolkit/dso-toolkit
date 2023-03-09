[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/dso-toolkit/dso-toolkit) [![npm version](http://img.shields.io/npm/v/dso-toolkit.svg)](https://npmjs.org/package/dso-toolkit "View this project on npm") [![Build status master branch](https://img.shields.io/travis/com/dso-toolkit/dso-toolkit/master)](https://travis-ci.com/dso-toolkit/dso-toolkit)

- [Slack chat](https://dso-toolkit.slack.com/)
- [Slack chat invite link](https://join.slack.com/t/dso-toolkit/shared_invite/zt-58125gbo-FtPAARcnU47rMgkT7KWikA)

# DSO Toolkit - Design System van het Digitaal Stelsel Omgevingswet (DSO)

De DSO Toolkit bestaat uit documentatie en een stijlgids. Daarnaast worden er twee implementaties geleverd: HTML/CSS en Web Components.
De Web Components krijgen voor Angular en React wrappers, zie issue #915.

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
| latest      | stable     | `https://cdn.dso-toolkit.nl/latest/`  |
| _tags only_ | _releases_ | `https://cdn.dso-toolkit.nl/VERSION/` |

The same goes for the component library:

| branch      | channel    | url                                   |
| ----------- | ---------- | ------------------------------------- |
| master      | stable     | `https://www.dso-toolkit.nl/master/`  |
| latest      | stable     | `https://www.dso-toolkit.nl/latest/`  |
| _tags only_ | _releases_ | `https://www.dso-toolkit.nl/VERSION/` |

```html
<link rel="stylesheet" href="https://cdn.dso-toolkit.nl/[master|latest|VERSION]/dso.css" />
```

For Web Components:

```html
<script type="module" src="https://cdn.dso-toolkit.nl/[master|latest|VERSION]/core/dso-toolkit.esm.js"></script>
<script nomodule src="https://cdn.dso-toolkit.nl/[master|latest|VERSION]/core/dso-toolkit.js"></script>
```

The referenced scripts are very small: Only the actually used Web Components are lazy loaded. For more information: https://stenciljs.com/docs/distribution

### Develop or mockups

To work on the DSO Toolkit using components and variants or create mockups of pages, forms or components you need Node 16 and Yarn.
See [CONTRIBUTING.md](CONTRIBUTING.md) on how to contribute.

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
yarn start --all
```

This will run the corresponding Storybook(s).

The following processes are started:

- **default**: CSS in watch mode, Stencil in watch mode, Storybook and Cypress
- **--react**: CSS in watch mode, Stencil in watch mode, Storybook for React components
- **--all**: CSS in watch mode, Stencil in watch mode, Storybook, and Storybook for React components

This will start Stencil on http://localhost:45333, Storybook on http://localhost:45000 and the Cypress GUI.
Since Stencil and Storybook are running it's possible to develop the components, but keep in mind the tests run in a production environment, so Stencil development tools like HMR will not be available.

#### `leaflet`

Development of Leaflet plugins is package transcendent. Run the following command from root:

```
yarn start:leaflet
yarn start:react-leaflet
```

This will start Stencil (http://localhost:45333) and Storybook (http://localhost:45000) in **production** (no live reload / HMR) and the Leaflet plugins development environment on http://localhost:41234 or the React Leaflet development environment on http://localhost:42345.

## Requirements

Node 16. For development on the DSO Toolkit you also need Yarn.

## Ports

Ports used during development:

- 41234 - Leaflet plugins dev app
- 42345 - React Leaflet plugins dev app
- 43300 - Docusaurus
- 45333 - Stencil
- 45000 - Storybook for HTML/CSS + Web Components
- 56406 - Storybook for React components
- 46006 - Storybook for Angular Components
