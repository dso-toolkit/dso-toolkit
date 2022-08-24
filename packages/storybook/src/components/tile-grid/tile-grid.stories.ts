import { storiesOfTileGrid } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components'
import { html } from 'lit-html';

import { tileTemplate } from '@dso-toolkit/css/src/components/tile/tile.template';
import { tileGridTemplate } from '@dso-toolkit/css/src/components/tile-grid/tile-grid.template';
import readme from '@dso-toolkit/css/src/components/tile-grid/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfTileGrid(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    tileGridDemoTemplate: (children) => tileGridTemplate({
      children: html`${children.map(c => tileTemplate(c))}`
    })
  }
);
