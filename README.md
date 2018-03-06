# DSO Toolkit and Component Library
This is the repository of the DSO Toolkit and Component Library. 

The toolkit is framework-agnostic and based on [Bootstrap v3.3.7](https://getbootstrap.com/docs/3.3) written in SCSS. The component library is written in Handlebars.js using Fractal. [Fractal](https://fractal.build)] is a _component library & styleguide framework_.

## Getting started
Releases can be found on the [GitHub Releases page](https://github.com/dso-toolkit/dso-toolkit/releases).

Each DSO Program Increment a new DSO Toolkit will be released. Every 1 to 2 weeks an alpha or beta will be released. Bugfix releases are released when needed.

Example:
>The latest release is 1.1.0. Bugfix releases will increment the PATCH:
> * 1.1.1, 
> * 1.1.2, 
> * 1.1.3 etc.

Example 2:
>At the end of the Program Increment, 1.2.0 will be released. In the preceeding weeks several alpha's and beta's will be released:
> * 1.2.0-alpha.0
> * 1.2.0-alpha.[1...n]
> * 1.2.0-beta.0
> * 1.2.0-beta.[1...n]
> * 1.2.0

Alpha's should be considered unstable. Beta's will not have any breaking changes.

### NPM
```
npm install dso-toolkit
```

Bundle `/node_modules/dso-toolkit/src/dso.scss` in your build process.

### CDN
The toolkit and component library are distributed to dso-toolkit.nl. Use the table below to resolve the branch/channel to the base url:

| branch      | channel    | url                                    |
|-------------|------------|----------------------------------------|
| *latest*    | unstable   | `https://cdn.dso-toolkit.nl/unstable/` |
| master      | stable     | `https://cdn.dso-toolkit.nl/stable/`   |
| *tags only* | *releases* | `https://cdn.dso-toolkit.nl/VERSION/`  |

The same goes for the component library:

| branch      | channel    | url                                    |
|-------------|------------|----------------------------------------|
| *latest*    | unstable   | `https://www.dso-toolkit.nl/unstable/` |
| master      | stable     | `https://www.dso-toolkit.nl/stable/`   |
| *tags only* | *releases* | `https://www.dso-toolkit.nl/VERSION/`  |

The branch *latest* is the current development branch, which at the time of writing was **1_2_0**

```html
<link rel="stylesheet" href="https://cdn.dso-toolkit.nl/stable/styles/dso.css" />
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
