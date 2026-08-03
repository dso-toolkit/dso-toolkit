import type { Meta } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/row-equal-heights/readme.md?raw";
import { html } from "lit-html";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";
import { highlightBoxTemplate } from "../highlight-box/highlight-box.template.js";
import { tileTemplate } from "../tile/tile.template.js";

import { highlightBoxes, tiles } from "./row-equal-heights.content.js";
import { decorator } from "./row-equal-heights.decorator";
import { rowEqualHeightsTemplate } from "./row-equal-heights.template.js";

type RowEqualHeightsStory = StoryObj<Record<string, never>, Renderer>;

const meta: Meta<Record<string, never>> = {
  title: "HTML|CSS/Row Equal Heights",
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const HighlightBoxes: RowEqualHeightsStory = {
  decorators: [(story) => decorator(story)],
  render: () =>
    rowEqualHeightsTemplate({
      children: html`${highlightBoxes.map(
        (highlightbox) => html`<div class="col-md-6 col-lg-3">${highlightBoxTemplate(highlightbox)}</div>`,
      )}`,
    }),
};

export const Tiles: RowEqualHeightsStory = {
  decorators: [(story) => decorator(story)],
  render: () =>
    rowEqualHeightsTemplate({
      children: html`${tiles.map((tile) => html`<div class="col-lg-2 col-md-4 col-xs-6">${tileTemplate(tile)}</div>`)}`,
    }),
};
