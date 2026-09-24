import { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";
import "./plekinfo-card-accordion.scss";

import { examplePageStories } from "../../../example-page-stories";

import { plekinfoCardInAccordionSections } from "./plekinfo-card-accordion.content";

const meta: Meta = {
  title: "Patronen/Plekinfo Card in Accordion",
};

export default meta;

interface PlekinfoCardInAccordionArgs {
  showStroke: boolean;
}

const Default = examplePageStories<PlekinfoCardInAccordionArgs>(
  (templates, { showStroke }) => {
    const { accordionTemplate } = templates;

    return html`
      ${accordionTemplate({
        variant: "compact-black",
        showStroke,
        sections: plekinfoCardInAccordionSections,
      })}
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
