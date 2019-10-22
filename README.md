* [Slack chat](https://dso-toolkit.slack.com/)
* [Slack chat invite link](https://join.slack.com/t/dso-toolkit/shared_invite/enQtNDA5Mjk5MTU5MDEyLTk5OWFmMWYwODlhMmRhMzMzN2E1NzZhNmQwYzhiNDliZGQ0NGMxMmE4MzkxM2U2NjZjNzNmZDQ0YmY3YTRiNTg)

# DSO Toolkit and Component Library
This is the repository of the DSO Toolkit and Component Library.

The Toolkit is framework-agnostic and based on [Bootstrap v3.3.7](https://getbootstrap.com/docs/3.3) written in SCSS. The component library is written in Handlebars.js using Fractal. [Fractal](https://fractal.build) is a _component library & styleguide framework_.

## Getting started
Releases can be found on the [GitHub Releases page](https://github.com/dso-toolkit/dso-toolkit/releases).

Alpha's should be considered unstable. Beta's will not have any breaking changes.

### NPM
```
npm install dso-toolkit
```

1. Add `node_modules/dso-toolkit/node_modules` and `node_modules` as [include paths](https://github.com/sass/node-sass#includepaths) to your SASS compiler/wrapper (See [#105](https://github.com/dso-toolkit/dso-toolkit/issues/105) for more information)
2. Bundle `/node_modules/dso-toolkit/src/dso.scss` in your build process.

### CDN
The Toolkit and component library are distributed to dso-toolkit.nl. Use the table below to resolve the branch/channel to the base url:

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
To develop the DSO Toolkit using components and variants or create mockups of pages, forms or components
```
git clone git@github.com:dso-toolkit/dso-toolkit.git
cd dso-toolkit
npm install
gulp
```

A local webserver is started at http://localhost:3000/. See the [Fractal guide](https://fractal.build/) on how to develop components. See [CONTRIBUTING.md](CONTRIBUTING.md) on how to contribute.

## Requirements
Node 9 and NPM 5.

## Dependencies
The DSO Toolkit and Component Library uses
* `npm` for package management
* `gulp` for build automation
* `node-sass` to compile sass to css
* `fractal` to document the Toolkit
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
