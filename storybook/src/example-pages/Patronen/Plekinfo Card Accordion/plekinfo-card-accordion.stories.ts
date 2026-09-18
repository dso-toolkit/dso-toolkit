import { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { examplePageStories } from "../../../example-page-stories";

import { plekinfoCardAccordionDemoCss, plekinfoCardAccordionSections } from "./plekinfo-card-accordion.content";

const meta: Meta = {
  title: "Patronen/Plekinfo Card Accordion",
};

export default meta;

interface PlekinfoCardAccordionArgs {
  showStroke: boolean;
}

const Default = examplePageStories<PlekinfoCardAccordionArgs>(
  (templates, { showStroke }) => {
    const { accordionTemplate } = templates;

    return html`
      ${accordionTemplate({
        variant: "compact-black",
        showStroke,
        sections: plekinfoCardAccordionSections,
      })}
      <style>
        ${plekinfoCardAccordionDemoCss}
      </style>
    `;
  },
  {
    argTypes: {
      showStroke: {
        control: { type: "boolean" },
      },
    },
    args: {
      showStroke: true,
    },
  },
);

export { Default };
