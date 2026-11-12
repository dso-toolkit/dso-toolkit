import { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit-html";
import { fn } from "storybook/test";

import { GridColumnArgs, gridColumnArgTypes, gridColumnArgsMapper } from "./grid-column.args.js";
import { gridColumnTemplate } from "./grid-column.template.js";
import { gridColumnContent, mainColumnContent } from "./grid.content.js";

type GridStory = StoryObj<GridColumnArgs>;

const meta: Meta<GridColumnArgs> = {
  title: "HTML|CSS/Grid",
  argTypes: gridColumnArgTypes,
  args: {
    columns: "xs-12 sm-4",
    overlay: false,
    dsoClose: fn(),
  },
  render: (args) =>
    html`<div class="row">
      <div class="col-xs-12 col-sm-8">${mainColumnContent()}</div>
      ${gridColumnTemplate(gridColumnArgsMapper(args, gridColumnContent()))}
    </div>`,
};

export default meta;

export const GridColumn: GridStory = {};
