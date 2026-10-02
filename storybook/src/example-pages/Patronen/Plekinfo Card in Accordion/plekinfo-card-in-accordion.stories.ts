import { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { accordionTemplate } from "../../../components/accordion/accordion.template.js";
import { plekinfoCardDemoCss } from "../../../components/plekinfo-card/plekinfo-card.demo.js";
import { examplePageMeta } from "../../../example-page-meta.js";

import { plekinfoCardInAccordionSections } from "./plekinfo-card-in-accordion.content.js";

const meta: Meta = {
  title: "Patronen/Plekinfo Card in Accordion",
  tags: ["!autodocs"],
  ...examplePageMeta(),
};

export default meta;

interface PlekinfoCardInAccordionArgs {
  noStroke?: boolean;
}

export const Default: StoryObj<PlekinfoCardInAccordionArgs> = {
  argTypes: {
    noStroke: {
      control: { type: "boolean" },
    },
  },
  args: {
    noStroke: false,
  },
  render: ({ noStroke }) => {
    return html`
      <style>
        ${plekinfoCardDemoCss}
      </style>
      ${accordionTemplate({
        variant: "compact",
        noStroke,
        sections: plekinfoCardInAccordionSections(),
      })}
    `;
  },
};
