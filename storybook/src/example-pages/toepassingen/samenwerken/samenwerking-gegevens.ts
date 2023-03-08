import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { footerPartial } from "../../partials/footer";
import { headerPartial } from "../../partials/header";
import { header, definitions, items } from "./samenwerking-gegevens.content";

examplePageFactory(
  "Toepassingen/Samenwerken",
  "Samenwerking gegevens",
  ({ buttonTemplate, buttonRowTemplate, tabsTemplate, definitionListTemplate }, templates) => html`
    <div class="container">
      ${headerPartial(templates, header)}
      <main>
        ${buttonRowTemplate({
          buttons: [
            {
              label: "Terug naar samenwerkingenn",
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
        ${tabsTemplate(items)}
        <h2>Samenwerkingsgegevens</h2>
        ${buttonRowTemplate({
          buttons: [{ label: "Samenwerking aanpassen", type: "button", variant: "secondary" }],
        })}
        <div class="row">
          <div class="col-md-4">${definitionListTemplate(definitions)}</div>
          <div class="col-md-4">
            <p><strong>Beschrijving</strong></p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            </p>
          </div>
        </div>
      </main>
      ${footerPartial(templates)}
    </div>
  `
);
