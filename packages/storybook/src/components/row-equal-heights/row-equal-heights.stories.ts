import { storiesOfRowEqualHeights } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';
import { html } from 'lit-html';

import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

import { rowEqualHeightsTemplate } from '@dso-toolkit/css/src/components/row-equal-heights/row-equal-heights.template';
import readme from '@dso-toolkit/css/src/components/row-equal-heights/readme.md';

import { highlightBoxTemplate } from '@dso-toolkit/css/src/components/highlight-box/highlight-box.template';
import { tileTemplate } from '@dso-toolkit/css/src/components/tile/tile.template';
import { whiteboxTemplate } from '@dso-toolkit/css/src/components/whitebox/whitebox.template';

import { decorator } from './row-equal-heights.decorator';

storiesOfRowEqualHeights(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    highlightBoxExample: (highlightboxes) => rowEqualHeightsTemplate({
      children: html`${highlightboxes.map(highlightbox => html`<div class="col-sm-12 col-md-6 col-lg-3">${highlightBoxTemplate(highlightbox)}</div>`)}`
    }),
    tileExample: (tiles) => rowEqualHeightsTemplate({
      children: html`${tiles.map(tile => html`<div class="col-lg-2 col-md-4 col-xs-6">${tileTemplate(tile)}</div>`)}`
    }),
    whiteboxExample: (whiteboxes) => rowEqualHeightsTemplate({
      children: html`${whiteboxes.map(whitebox => html`<div class="col-md-4 col-sm-6 col-xs-12">${whiteboxTemplate(whitebox)}</div>`)}`
    }),
    decorator
  }
);
