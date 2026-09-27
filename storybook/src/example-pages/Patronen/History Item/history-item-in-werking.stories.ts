import { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { headingTemplate } from "../../../components/heading/heading.template.js";
import { historyItemTemplate } from "../../../components/history-item/history-item.template.js";
import { examplePageMeta } from "../../../example-page-meta.js";

import { historyItemsInWerking } from "./history-item.content.js";

const meta: Meta = {
  ...examplePageMeta(),
  title: "Patronen/History Item/In Werking",
  tags: ["!autodocs"],
};

export default meta;

export const HistoryItemInWerking: StoryObj = {
  name: "In Werking",
  render: () => {
    return html`${headingTemplate({ level: 5, children: "Gebeurtenis" })}
      <hr />
      <ul class="dso-list-unstyled">
        ${historyItemsInWerking().map((historyItem) => html`<li>${historyItemTemplate(historyItem)}</li>`)}
      </ul>`;
  },
};
