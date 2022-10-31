# Contributing to the DSO Toolkit

This repository houses several projects, and issues are labeled accordingly:

- `/packages/dso-toolkit`: A component library
- `/packages/sources`: A collection of resources for the various parts of the DSO Design System.
- `/packages/core`: A Web Component implementation written in Stencil Components

This project uses [Semantic Versioning](http://semver.org/).

## Language

There are two language domains: English and Dutch. Anything tech-related (styling, source code, standard open source files, etc) is in English. Anything else (Fractal notes, manuals, GitHub issues and comments) is in Dutch.

## How to contribute

Contributing to the DSO Toolkit is fairly straight-forward:

1. Fork
2. Open an issue
3. Contribute
4. Create a pull request

### 1. Fork

Fork the repository to your own - or your organisation's - namespace.

### 2. Open an issue

Every change is accomponied by an issue describing the change, scope, and incentive, and preferably a URL and test scenario. This way contributors, maintainers and product owners can reason about the suggested changes. Changes need to be approved by the owner of the repository.

Properly label the issue, see _labels_ section below.

### 3. Contribute

- Take note of the codestyle, we are using linters.
- Add an entry to the CHANGELOG.md.
- When changing the toolkit, demonstrate the change using the component library (new components or variants)
- Run `yarn test`. Commit new/changed reference DOM files using `yarn reference:dom`.

### 4. Create a pull request

Create a pull request to the target version branch, most likely `master`. A maintainer will review your changes, merge them, and close the issue. Label the issue with [status:review].

## Reviewing

When reviewing a pull request, make sure the items in **step 3. Contribute** are checked. Pay special attention to the changelog and (if needed) reference DOM files.

## Labels

The repository uses different categories of labels.

- Package labels : what part of the codebase's resulting packages are affected
- Subject labels : issues concerning attention subjects, such as 'accessibility', are labeled accordingly
- Type labels : indicates the type of issue, see below
- Status labels : for workflow, see below

Apart from these labels, issues are labeled [BREAKING] when causing major impact (such as a change in the API), and [question]

### Type labels

- [type:bug] : Something isn't working
- [type:build] : Changes in the build or deploy pipeline
- [type:documentation] : Changes in documentation
- [type:dso-toolkit.nl] : Changes to the documentation site itself
- [type:improvement] : New feature or request
- [type:library] : Changes to the workings of the library software
- [type:question] : Questions about how to use a component, or other types of support, or just general 'questions'
- [type:research] : Proof-of-concept issues & field research work that's worth sharing

### Status labels

In workflow order:

- [status:in specification] : Issue needs refinement and approval to start working
- [status:ready] : Issue is fully specified and ready to start working on
- [status:in progress] : People are working on it
- [status:in review] : Change needs to be reviewed
- [status:testable] : Change is testable via the branch/version selector on https://dso-toolkit.nl/
- [status:accepted] : Tested (via version/branch selector) and approved, ready to be merged in master branch
- [status:done] : Finished development and merged into target branch
- [status:won't do] : Change cancelled, or not approved

## Project organisation

### `@dso-toolkit/core`

Package is located in `/packages/core`.

- Components have their own directory and are placed in `src/components`.
- The filename of the Stencil component is `my-component.tsx`.
- `import`s are grouped by: NPM package, parent imports, adjacent imports, children imports and sorted by module name:

  ```
  import { storiesOfMyComponent } from '@dso-toolkit/sources';
  import { html } from 'lit-html';
  import { ifDefined } from 'lit-html/directives/if-defined.js';

  import { myUtility } from '../my-utility.ts';

  import { myComponentTemplate } from './my-component.ts';
  import readme from './readme.md';

  import { generateSomething } from './functions/generate-something.ts';
  ```

- `import`s are sorted by import path
- Stories filename is `my-component.stories.ts`.
- Stories are imported with: `import { storiesOfMyComponent } from '@dso-toolkit/sources';`.
- The template that's passed to `storiesOfMyComponent()` has its own file `my-component.component.ts` and is returned by an exported function `myComponentTemplate({}: MyComponent)`. `MyComponent` is imported from `@dso-toolkit/sources`.
- If a component has a stylesheet, it's named `my-component.scss`.
- Every component has a `readme.md` file which starts with
  ```
  # `<my-component>`
  ```
