import type { Meta, StoryObj } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/row-equal-heights/readme.md?raw";
import { html } from "lit-html";
import { compiler } from "markdown-to-jsx/react";

import { highlightBoxTemplate } from "../highlight-box/highlight-box.template.js";
import { tileTemplate } from "../tile/tile.template.js";

import { highlightBoxes, tiles } from "./row-equal-heights.content.js";
import { decorator } from "./row-equal-heights.decorator";
import { rowEqualHeightsTemplate } from "./row-equal-heights.template.js";

const meta: Meta = {
  title: "HTML|CSS/Row Equal Heights",
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const HighlightBoxes: StoryObj = {
  decorators: [(story) => decorator(story)],
  render: () =>
    rowEqualHeightsTemplate({
      children: html`${highlightBoxes.map(
        (highlightbox) => html`<div class="col-md-6 col-lg-3">${highlightBoxTemplate(highlightbox)}</div>`,
      )}`,
    }),
};

export const Tiles: StoryObj = {
  decorators: [(story) => decorator(story)],
  render: () =>
    rowEqualHeightsTemplate({
      children: html`${tiles.map((tile) => html`<div class="col-lg-2 col-md-4 col-xs-6">${tileTemplate(tile)}</div>`)}`,
    }),
};
