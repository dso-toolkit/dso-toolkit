import { storiesOfRowEqualHeights } from '@dso-toolkit/sources';
import { ArgsStoryFn } from '@storybook/addons';
import { storiesOf } from '@storybook/web-components';

import { rowEqualHeightsTemplate } from './row-equal-heights.template';
import readme from './readme.md';
import { html, TemplateResult } from 'lit-html';
import { highlightBoxTemplate } from '../highlight-box/highlight-box.template';
import { tileTemplate } from '../tile/tile.template';
import { whiteboxTemplate } from '../whitebox/whitebox.template';

function decorator(story: ArgsStoryFn<TemplateResult>): TemplateResult {
  return html`
    <div class="container">
      ${story()}
    </div>
  `;
}

storiesOfRowEqualHeights(
  {
    module,
    storiesOf,
    readme
  },
  {
    rowEqualHeightsTemplate,
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
