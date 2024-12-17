import { Meta } from "@storybook/web-components";
import { rowEqualHeightsMeta, rowEqualHeightsStories } from "dso-toolkit";

import { templateContainer } from "../../templates";
import readme from "dso-toolkit/src/components/row-equal-heights/readme.md?raw";

import { decorator } from "./row-equal-heights.decorator";
import { html } from "lit-html";

const meta: Meta = {
  ...rowEqualHeightsMeta({ readme }),
  title: "HTML|CSS/Row Equal Heights",
};

export default meta;

const { HighlightBoxes, Tiles, Whiteboxes } = rowEqualHeightsStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { highlightBoxTemplate, tileTemplate, whiteboxTemplate, rowEqualHeightsTemplate } = templates;

    return {
      rowEqualHeightsTemplate,
      highlightBoxExample: (highlightboxes) =>
        rowEqualHeightsTemplate({
          children: html`${highlightboxes.map(
            (highlightbox) => html`<div class="col-md-6 col-lg-3">${highlightBoxTemplate(highlightbox)}</div>`,
          )}`,
        }),
      tileExample: (tiles) =>
        rowEqualHeightsTemplate({
          children: html`${tiles.map(
            (tile) => html`<div class="col-lg-2 col-md-4 col-xs-6">${tileTemplate(tile)}</div>`,
          )}`,
        }),
      whiteboxExample: (whiteboxes) =>
        rowEqualHeightsTemplate({
          children: html`${whiteboxes.map(
            (whitebox) => html`<div class="col-md-4 col-sm-6">${whiteboxTemplate(whitebox)}</div>`,
          )}`,
        }),
    };
  },
  decorator,
});

export { HighlightBoxes, Tiles, Whiteboxes };
