import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { footerPartial } from "../../partials/footer";
import { headerPartial } from "../../partials/header";
import { header, items } from "./samenwerking-gegevens.content";

examplePageFactory(
  "Toepassingen/Samenwerken",
  "Samenwerking gegevens",
  ({ buttonTemplate, buttonRowTemplate, tabsTemplate }, templates) => html`
    <div class="container">
      ${headerPartial(templates, header)}
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
        ${tabsTemplate(items(templates))}
      </main>
      ${footerPartial(templates)}
    </div>
  `
);
