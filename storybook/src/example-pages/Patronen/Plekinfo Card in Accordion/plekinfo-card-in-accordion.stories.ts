import { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { accordionTemplate } from "../../../components/accordion/accordion.template";
import { plekinfoCardDemoCss } from "../../../components/plekinfo-card/plekinfo-card.demo";
import { plekinfoCardTemplate } from "../../../components/plekinfo-card/plekinfo-card.template";

import { plekinfoCardInAccordionSections } from "./plekinfo-card-in-accordion.content";

const meta: Meta = {
  title: "Patronen/Plekinfo Card in Accordion",
  tags: ["!autodocs"],
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
    noStroke: true,
  },
  render: ({ noStroke }) => {
    return html`
      <style>
        ${plekinfoCardDemoCss}
      </style>
      ${accordionTemplate({
        variant: "compact",
        noStroke,
        sections: plekinfoCardInAccordionSections(plekinfoCardTemplate),
      })}
    `;
  },
};
