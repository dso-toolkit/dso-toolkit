import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { buttonTemplate } from "../../../components/button/button.template.js";
import { buttonRowTemplate } from "../../../components/button-row/button-row.template.js";
import { tabsTemplate } from "../../../components/tabs/tabs.template.js";
import { examplePageStory } from "../../../example-page-story.js";
import { footerPartial } from "../../partials/footer.js";
import { headerPartial } from "../../partials/header.js";

import { header, items } from "./samenwerken-gegevens.content.js";

const meta: Meta = {
  title: "Voorbeeldpagina's/Toepassingen/Samenwerken/Samenwerken gegevens",
};

export default meta;

const SamenwerkenGegevens = examplePageStory(() => {
  return html`
    <div class="container">
      ${headerPartial(header)}
      <main>
        ${buttonRowTemplate({
          buttons: [
            {
              label: "Terug naar samenwerkingen",
              type: "button",
              variant: "tertiary",
              icon: { icon: "chevron-left" },
            },
          ],
        })}
        <div class="dso-app-heading">
          <div class="dso-context-wrapper">
            <span class="dso-context-label">
              <h1>Verbouwing Hoogmade straat 7</h1>
            </span>
            <div class="dso-context-container">
              <div class="dso-context-select">
                ${buttonTemplate({
                  label: "Samenwerking sluiten",
                  type: "button",
                  variant: "tertiary",
                  icon: { icon: "lock" },
                })}
              </div>
            </div>
          </div>
        </div>
        ${tabsTemplate(items())}
      </main>
      ${footerPartial()}
    </div>
  `;
});

export { SamenwerkenGegevens };
