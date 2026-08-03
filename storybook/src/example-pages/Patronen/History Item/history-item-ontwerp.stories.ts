import { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { headingTemplate } from "../../../components/heading/heading.template.js";
import { historyItemTemplate } from "../../../components/history-item/history-item.template.js";
import { examplePageStory } from "../../../example-page-story.js";

import { historyItemsOntwerp } from "./history-item.content.js";

const meta: Meta = {
  title: "Patronen/History Item/Ontwerp",
};

export default meta;

const HistoryItemOntwerp = examplePageStory(() => {
  return html`${headingTemplate({ level: 5, children: "Gebeurtenis" })}
    <hr />
    <ul class="dso-list-unstyled">
      ${historyItemsOntwerp.map((historyItem) => html`<li>${historyItemTemplate(historyItem)}</li>`)}
    </ul>`;
});

export { HistoryItemOntwerp };
