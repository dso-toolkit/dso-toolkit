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

export const Default: StoryObj = {
  render: () => {
    return html`
      <style>
        ${plekinfoCardDemoCss}
      </style>
      ${accordionTemplate({
        variant: "compact",
        sections: plekinfoCardInAccordionSections(),
      })}
    `;
  },
};
