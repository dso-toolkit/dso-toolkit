import readme from "@dso-toolkit/core/src/components/panel/readme.md?raw";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit-html";
import { compiler } from "markdown-to-jsx/react";

import { infoTemplate } from "../info/info.template.js";
import { richContentTemplate } from "../rich-content/rich-content.template.js";

import { PanelArgs, panelArgTypes, panelArgs, panelArgsMapper } from "./panel.args.js";
import { panelTemplate } from "./panel.template.js";

type PanelStory = StoryObj<PanelArgs>;

const meta: Meta<PanelArgs> = {
  title: "Core/Panel",
  argTypes: panelArgTypes,
  args: panelArgs,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
  render: (args) => panelTemplate(panelArgsMapper(args, children, heading)),
};

export default meta;

const heading = html`<h2 slot="heading">Panel titel</h2>`;
const children = richContentTemplate({
  children: html`
    <ul>
      <li>Locatie 1</li>
      <li>
        Locatie 2
        ${infoTemplate({
          fixed: true,
          content: richContentTemplate({
            children: html`<p><strong>Let op:</strong> <i>voorbehoud A bij Locatie 2.</i></p>`,
          }),
        })}
      </li>
      <li>
        Locatie 3
        <ul>
          <li>Locatie 3.1</li>
          <li>Locatie 3.2</li>
        </ul>
      </li>
    </ul>
  `,
});
export const Default: PanelStory = {};

export const Emphasized: PanelStory = {
  args: {
    emphasized: true,
  },
};
