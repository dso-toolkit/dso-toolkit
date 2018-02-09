# Contributing to the DSO Toolkit and DSO Component Library
This repository houses two projects:
* The toolkit in `src/` and `assets/`
* A component library in `docs/` and `components/`

The toolkit is based on [Bootstrap v3.3.7](https://getbootstrap.com/docs/3.3). The main differences are accessibility and script enhancements. The component library is written in Handlebars.js using Fractal. [Fractal](http://fractal.build)] is a _component library & styleguides framework_.

This project uses [Semantic Versioning](http://semver.org/).

## How to contribute
Contributing to the DSO toolkit is fairly straight-forward:
1. Open an issue
2. Contribute
3. Create a merge request

### 1. Open an issue
Every change is accomponied by an issue describing the change, scope, and incentive. This way contributers and maintainers can reason about the suggested changes.

Properly label the issue as a bug, improvement, new feature.

### 2. Contribute
* Take note of the codestyle, we are using linters. 
* Add an entry to the CHANGELOG using `#issueId: summary-of-the-change`
* If possible, change both the toolkit **and** component library (You want to showcase your changes, right?)
* When contributing (breaking) changes, update changelog accordingly. Commit a new reference DOM using `gulp reference:dom` as well.

### 3. Create a merge request
Create a merge request to `master`. A maintainer will review your changes, merge them, and close the issue.

## Reviewing
When reviewing a merge request, make sure the items in step 2. Contribute are checked. Pay special attention to the changelog. Any changes in the reference DOM should be documented in the changelog.

For example:
- DSOCOMLIB-000: External links in text should open in a new page\
To every `a.extern` in `p` add `target="_blank"`.

## Building a static component library
To build a static version:
```
gulp build
```

This will generate static a static site component library (`/assets`, `/components` and `/docs`)  AND toolkit (`/src`).

## Further reading
* https://www.npmjs.com/
* https://www.npmjs.com/
* https://rollupjs.org/
* http://babeljs.io/
* https://github.com/sass/node-sass
* http://fractal.build/
* http://keepachangelog.com/en/1.0.0/
* http://semver.org/
* http://handlebarsjs.com/
* http://www.yaml.org/
