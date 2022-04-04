import { storiesOfTileGrid } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components'

import { tileGridTemplate } from './tile-grid.template';
import readme from './readme.md';
import { html } from 'lit-html';
import { tileTemplate } from '../tile/tile.template';

storiesOfTileGrid(
  {
    module,
    storiesOf,
    readme
  },
  {
    tileGridDemoTemplate: (children) => tileGridTemplate({
      children: html`${children.map(c => tileTemplate(c))}`
    })
  }
);
