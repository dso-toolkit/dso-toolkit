import { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { examplePageStories } from "../../../example-page-stories";

import { historyItemsInWerking } from "./history-item.content";

const meta: Meta = {
  title: "Patronen/History Item/In Werking",
};

export default meta;

const HistoryItemInWerking = examplePageStories((templates) => {
  const { headingTemplate, historyItemTemplate } = templates;

  return html`${headingTemplate({ level: 5, children: "Gebeurtenis" })}
    <hr />
    <ul class="dso-list-unstyled">
      ${historyItemsInWerking.map((historyItem) => html`<li>${historyItemTemplate(historyItem)}</li>`)}
    </ul>`;
});

export { HistoryItemInWerking };
