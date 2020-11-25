[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/dso-toolkit/dso-toolkit) [![npm version](http://img.shields.io/npm/v/dso-toolkit.svg)](https://npmjs.org/package/dso-toolkit "View this project on npm") [![Build status master branch](https://img.shields.io/travis/com/dso-toolkit/dso-toolkit/master)](https://travis-ci.com/dso-toolkit/dso-toolkit)


* [Slack chat](https://dso-toolkit.slack.com/)
* [Slack chat invite link](https://join.slack.com/t/dso-toolkit/shared_invite/enQtNDA5Mjk5MTU5MDEyLTk5OWFmMWYwODlhMmRhMzMzN2E1NzZhNmQwYzhiNDliZGQ0NGMxMmE4MzkxM2U2NjZjNzNmZDQ0YmY3YTRiNTg)

# DSO Toolkit and Component Library
This is the repository of the DSO Toolkit and Component Library.

The toolkit is framework-agnostic and based on [Bootstrap v3.3.7](https://getbootstrap.com/docs/3.3) written in SCSS. The component library is written in Handlebars.js using Fractal. [Fractal](https://fractal.build) is a _component library & styleguide framework_.

## Getting started
Releases can be found on the [GitHub Releases page](https://github.com/dso-toolkit/dso-toolkit/releases).

Alpha's should be considered unstable. Beta's will not have any breaking changes.

### NPM registry
```
npm install dso-toolkit
```

1. Add `node_modules/dso-toolkit/libs` and `node_modules` as [include paths](https://github.com/sass/node-sass#includepaths) to your SASS compiler/wrapper (See [#105](https://github.com/dso-toolkit/dso-toolkit/issues/105) for more information)
2. Bundle `/node_modules/dso-toolkit/src/dso.scss` in your build process.

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

### Develop or mockups
**Important notice: We recently switched to Yarn**: It's possible that you're still looking at a topic branch that uses NPM:
* If your repository contains `package-lock.json`, continue using `npm`.
* If you see `yarn.lock`, that means you should start using `yarn`. See below for more information.

**Everytime you switch to a revision (tag, branch, commit) that uses a different package manager (yarn or npm), you need to reinstall node_modules:**

```
npx rimraf node_modules
npm install OR yarn install
```

To develop the DSO Toolkit using components and variants or create mockups of pages, forms or components. Either install Yarn with

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
yarn start
```

A local webserver is started at http://localhost:3000/. See the [Fractal guide](https://fractal.build/) on how to develop components. See [CONTRIBUTING.md](CONTRIBUTING.md) on how to contribute.

## Requirements
Node 12. For development on the DSO Toolkit you also need Yarn.

## Dependencies
The DSO Toolkit and Component Library uses
* `npm` as the registry for node packages
* `yarn` for package management
* `gulp` for build automation
* `node-sass` to compile sass to css
* `fractal` to document the toolkit
* `yaml` to configure fractal components

Fractal is configured to use `handlebars` and `yaml`.

## Further reading
* https://www.npmjs.com/
* https://github.com/sass/node-sass
* http://fractal.build/
* http://keepachangelog.com/en/1.0.0/
* http://semver.org/
* http://handlebarsjs.com/
* http://www.yaml.org/
