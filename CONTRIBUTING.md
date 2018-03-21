# Contributing to the DSO Toolkit and DSO Component Library
This repository houses two projects:
* The toolkit in `src/` and `assets/`
* A component library in `docs/` and `components/`

This project uses [Semantic Versioning](http://semver.org/).

## Language
There are two language domains: English and Dutch. Anything tech-related (styling, source code, standard open source files, etc) is in English. Anything else (Fractal notes, manuals, GitHub issues and comments) is in Dutch.

## How to contribute
Contributing to the DSO toolkit is fairly straight-forward:
1. Fork
2. Open an issue
3. Contribute
4. Create a pull request

### 1. Fork
Fork the repository to your own - or your organisation's - namespace.

### 2. Open an issue
Every change is accomponied by an issue describing the change, scope, and incentive. This way contributers, maintainers and product owners can reason about the suggested changes.

Properly label the issue as a bug, improvement, new feature.

### 3. Contribute
* Take note of the codestyle, we are using linters. 
* Add an entry to the CHANGELOG.md.
* When changing the toolkit, try to demonstrate the change using the component library (new components or variants)
* Run `gulp test:dom`. Commit new/changed reference DOM files using `gulp reference:dom`.

### 4. Create a pull request
Create a pull request to the target version branch (for example `1_2_0`). A maintainer will review your changes, merge them, and close the issue.

## Reviewing
When reviewing a pull request, make sure the items in __step 3. Contribute__ are checked. Pay special attention to the changelog and (if needed) reference DOM files.

## Building a static component library
To build a static version:
```
gulp build
```

This will generate static a static site component library (`/assets`, `/components` and `/docs`) AND toolkit (`/src`).
