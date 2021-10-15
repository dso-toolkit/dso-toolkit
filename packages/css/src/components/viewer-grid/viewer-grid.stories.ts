import { storiesOfViewerGrid } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components'

import { viewerGridTemplate } from './viewer-grid.template';
import readme from './readme.md';
import { html } from 'lit-html';

storiesOfViewerGrid(
  {
    module,
    storiesOf,
    readme
  },
  {
    viewerGridDemoTemplate: ({ closeAside, expand, panelSize, panelOpen, shrink }) => viewerGridTemplate({
      closeAside,
      expand,
      panelOpen,
      panelSize,
      shrink,
      main: html`<strong>MAIN</strong>`,
      map: html`<strong>MAP</strong>`,
      aside: html`<strong>ASIDE</strong>`
    })
  }
);
