import { Meta } from "@storybook/web-components";
import { rowEqualHeightsMeta, rowEqualHeightsStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/row-equal-heights/readme.md?raw";
import { html } from "lit-html";

import { templateContainer } from "../../templates";

import { decorator } from "./row-equal-heights.decorator";

const meta: Meta = {
  ...rowEqualHeightsMeta({ readme }),
  title: "HTML|CSS/Row Equal Heights",
};

export default meta;

const { HighlightBoxes, Tiles } = rowEqualHeightsStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { highlightBoxTemplate, tileTemplate, rowEqualHeightsTemplate } = templates;

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
    };
  },
  decorator,
});

export { HighlightBoxes, Tiles };
