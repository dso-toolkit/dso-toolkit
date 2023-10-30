import { storiesOfRowEqualHeights, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";
import { html } from "lit-html";

import readme from "dso-toolkit/src/components/row-equal-heights/readme.md?raw";

import { decorator } from "./row-equal-heights.decorator";
import { templateContainer } from "../../templates";

storiesOfRowEqualHeights(
  {
    parameters: {
      module,
      storiesOf,
      readme,
      root: StoryRoot.HtmlCss,
    },
    templateContainer,
    storyTemplates: ({ highlightBoxTemplate, tileTemplate, whiteboxTemplate, rowEqualHeightsTemplate }) => ({
      highlightBoxExample: (highlightboxes) =>
        rowEqualHeightsTemplate({
          children: html`${highlightboxes.map(
            (highlightbox) =>
              html`<div class="col-xs-12 col-sm-12 col-md-6 col-lg-3">${highlightBoxTemplate(highlightbox)}</div>`
          )}`,
        }),
      tileExample: (tiles) =>
        rowEqualHeightsTemplate({
          children: html`${tiles.map(
            (tile) => html`<div class="col-lg-2 col-md-4 col-xs-6">${tileTemplate(tile)}</div>`
          )}`,
        }),
      whiteboxExample: (whiteboxes) =>
        rowEqualHeightsTemplate({
          children: html`${whiteboxes.map(
            (whitebox) => html`<div class="col-md-4 col-sm-6 col-xs-12">${whiteboxTemplate(whitebox)}</div>`
          )}`,
        }),
    }),
  },
  {
    decorator,
  }
);
