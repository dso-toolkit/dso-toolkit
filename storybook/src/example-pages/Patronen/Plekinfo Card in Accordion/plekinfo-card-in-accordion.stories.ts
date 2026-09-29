import { Meta } from "@storybook/web-components-vite";
import { plekinfoCardDemoCss } from "dso-toolkit/src/components/plekinfo-card/plekinfo-card.demo";
import { html } from "lit-html";

import { examplePageStories } from "../../../example-page-stories";

import { plekinfoCardInAccordionSections } from "./plekinfo-card-in-accordion.content";

const meta: Meta = {
  title: "Patronen/Plekinfo Card in Accordion",
};

export default meta;

interface PlekinfoCardInAccordionArgs {
  noStroke?: boolean;
}

const Default = examplePageStories<PlekinfoCardInAccordionArgs>(
  (templates, { noStroke }) => {
    const { accordionTemplate, plekinfoCardTemplate } = templates;

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
  {
    argTypes: {
      noStroke: {
        control: { type: "boolean" },
      },
    },
    args: {
      noStroke: true,
    },
  },
);

export { Default };
