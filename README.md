# DSO Toolkit and Component Library
This is the repository of the DSO Toolkit and Component Library. The toolkit is located in `/src`, the component library and documentation in `/components` and `/docs`.

## Usage
The toolkit and component library is distributed to dso-toolkit.nl.

### Toolkit

The toolkit is framework-agnostic and consists of only styling: `styles/dso.css`. Use the table below to resolve the branch/channel to the base url

| branch      | channel    | url                                    |
|-------------|------------|----------------------------------------|
| dev         | unstable   | `https://cdn.dso-toolkit.nl/unstable/` |
| master      | stable     | `https://cdn.dso-toolkit.nl/stable/`   |
| *tags only* | *releases* | `https://cdn.dso-toolkit.nl/VERSION/`  |

The same goes for the component library:

| branch      | channel    | url                                    |
|-------------|------------|----------------------------------------|
| dev         | unstable   | `https://www.dso-toolkit.nl/unstable/` |
| master      | stable     | `https://www.dso-toolkit.nl/stable/`   |
| *tags only* | *releases* | `https://www.dso-toolkit.nl/VERSION/`  |

Example:
```html
<link rel="stylesheet" href="https://cdn.dso-toolkit.nl/stable/styles/dso.css" />
```

## Requirements
Node 9 and NPM 5.

## Getting started
1. Clone the repository
1. Run `npm install`
1. Run `gulp`.

A development webserver on http://localhost:3000 with BrowserSync is started. All files in `assets/`, `components/`, `docs/` and `src/` are watched.

## Further reading
The DSO Toolkit and Component Library uses
* `npm` for package management
* `gulp` for build automation
* `node-sass` to compile sass to css
* `fractal` to document the toolkit

Fractal is configured to use `handlebars` and `yaml`.
