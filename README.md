[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/dso-toolkit/dso-toolkit) [![npm version](http://img.shields.io/npm/v/dso-toolkit.svg)](https://npmjs.org/package/dso-toolkit "View this project on npm") [![Build status master branch](https://img.shields.io/travis/com/dso-toolkit/dso-toolkit/master)](https://travis-ci.com/dso-toolkit/dso-toolkit)


* [Slack chat](https://dso-toolkit.slack.com/)
* [Slack chat invite link](https://join.slack.com/t/dso-toolkit/shared_invite/zt-58125gbo-FtPAARcnU47rMgkT7KWikA)

# DSO Toolkit - Design System van het Digitaal Stelsel Omgevingswet (DSO)

De DSO Toolkit bestaat uit documentatie en een stijlgids. Daarnaast worden er twee implementaties geleverd: CSS en Web Components. De Web Components krijgen voor Angular en React wrappers, zie issue #915.

De deliverables van de DSO Toolkit:
* **Handleiding**: Een handleiding voor elke versie op [https://www.dso-toolkit.nl/](https://www.dso-toolkit.nl/)
* **CDN**: Een CDN op https://cdn.dso-toolkit.nl/, voor documentatie zie verderop in deze README
* **NPM package `@dso-toolkit/sources`**: Alle bronbestanden van het DSO Design System.
* **NPM package `dso-toolkit`**: De handleiding en complete CSS implementatie van de DSO stijlset.

We zijn bezig met het verhuizen van de styling van `dso-toolkit` naar `@dso-toolkit/sources`. Zodra die verhuizing is afgerond zal `dso-toolkit` worden deprecated en moeten implementaties overstappen naar `@dso-toolkit/core` (eventueel met Framework bindings), `@dso-toolkit/css` of `@dso-toolkit/sources`. De componenten zoals die worden aangeboden op [https://www.dso-toolkit.nl/](https://www.dso-toolkit.nl/) blijven functioneren. Voor meer informatie zie [#827](https://github.com/dso-toolkit/dso-toolkit/issues/#827)

## Getting started

Stable releases can be found on the [GitHub Releases page](https://github.com/dso-toolkit/dso-toolkit/releases).

### NPM registry

```
npm install dso-toolkit --save-dev
```

#### Compile SCSS

Stylesheets need to be compiled using Dart Sass. libsass (NPM package `node-sass`) is unsupported.

1. Add `node_modules/dso-toolkit/libs` as [load path](https://sass-lang.com/documentation/cli/dart-sass#load-path) to your (Dart) Sass compiler/wrapper.
2. Import `/node_modules/dso-toolkit/src/dso.scss` in your stylesheet or build process.

#### Bundle CSS

Import or bundle `/node_modules/dso-toolkit/dist/toolkit/styles/dso.css`.

### CDN

The toolkit and component library are distributed to dso-toolkit.nl. Use the table below to resolve the branch/channel to the base url:

| branch      | channel    | url                                    |
|-------------|------------|----------------------------------------|
| master      | stable     | `https://cdn.dso-toolkit.nl/master/`   |
| *tags only* | *releases* | `https://cdn.dso-toolkit.nl/VERSION/`  |

The same goes for the component library:

| branch      | channel    | url                                    |
|-------------|------------|----------------------------------------|
| master      | stable     | `https://www.dso-toolkit.nl/master/`   |
| *tags only* | *releases* | `https://www.dso-toolkit.nl/VERSION/`  |

```html
<link rel="stylesheet" href="https://cdn.dso-toolkit.nl/[master|VERSION]/styles/dso.css" />
```

For Web Components:

```html
<script type="module" src="https://cdn.dso-toolkit.nl/[master|VERSION]/core/dso-toolkit.esm.js"></script>
<script nomodule src="https://cdn.dso-toolkit.nl/[master|VERSION]/core/dso-toolkit.js"></script>
```

The referenced scripts are very small: Only the actually used Web Components are lazy loaded. For more information: https://stenciljs.com/docs/distribution

### Develop or mockups
To work on the DSO Toolkit using components and variants or create mockups of pages, forms or components you need Node 16 and Yarn. See [CONTRIBUTING.md](CONTRIBUTING.md) on how to contribute.

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

#### `fractal`
The classic environment with Fractal and Stencil. Because this environment needs two packages (`@dso-toolkit/core` and `dso-toolkit`) running, this command only be started from the root of the repository, :

```
yarn fractal
```

Fractal is started at http://localhost:43000/, Stencil is running on http://localhost:53333. See the [Fractal guide](https://fractal.build/) for more information on Fractal.

#### `development`

This environment is used to develop new components in Storybook. Storybook is built around stories and since this project has multiple Storybooks (one for each implementation), the stories are put in a separate package `@dso-toolkit/sources` (`/packages/sources`). All the implementations have a devDependency on `@dso-toolkit/sources`.

The easiest way to start this environment is with one of the following commands:

```
yarn start
yarn start --react
yarn start --all
```

This will start `@dso-toolkit/sources` in watch mode and run the corresponding Storybook(s). Since these commands contain a colon (`:`), these commands can be run from anywhere in the project.

The following processes are started:
* **default**: CSS in watch mode, Stencil in watch mode, Storybook and Cypress
* **--react**: CSS in watch mode, Stencil in watch mode, Storybook for React components
* **--all**: CSS in watch mode, Stencil in watch mode, Storybook, and Storybook for React components

This will start Stencil on http://localhost:53333, Storybook on http://localhost:45000 and the Cypress GUI. Since Stencil and Storybook are running it's possible to develop the components, but keep in mind the tests run in a production environment: This means no Stencil development tools like HMR.

#### `leaflet`

Like `fractal`, development of Leaflet plugins is package transcendent. Run the following command from root:

```
yarn start:leaflet
yarn start:react-leaflet
```

This will start Stencil (http://localhost:53333) and Storybook (http://localhost:45000) in **production** (no live reload / HMR) and the Leaflet plugins development environment on http://localhost:41234 or the React Leaflet development environment on http://localhost:42345.

## Requirements
Node 16. For development on the DSO Toolkit you also need Yarn.

## Dependencies
The DSO Toolkit and Component Library uses
* `npm` as the registry for node packages
* `yarn` for package management
* `gulp` for build automation
* `sass` to compile SCSS to css
* `fractal` to document the toolkit
* `yaml` to configure fractal components

## Further reading
* https://www.npmjs.com/
* http://fractal.build/
* http://keepachangelog.com/en/1.0.0/
* http://semver.org/
* http://handlebarsjs.com/
* http://www.yaml.org/

## Ports

Ports used during development:

* 41234 - Leaflet plugins dev app
* 42345 - React Leaflet plugins dev app
* 43000 - Fractal
* 53333 - Stencil
* 45000 - Storybook for HTML/CSS + Web Components
* 56406 - Storybook for React components
