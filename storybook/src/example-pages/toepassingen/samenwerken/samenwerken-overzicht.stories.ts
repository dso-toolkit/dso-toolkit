import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { applicationHeadingTemplate } from "../../../components/application-heading/application-heading.template.js";
import { badgeTemplate } from "../../../components/badge/badge.template.js";
import { buttonRowTemplate } from "../../../components/button-row/button-row.template.js";
import { linkTemplate } from "../../../components/link/link.template.js";
import { examplePageStory } from "../../../example-page-story.js";
import { footerPartial } from "../../partials/footer.js";
import { headerPartial } from "../../partials/header.js";

import { header } from "./samenwerken-overzicht.content.js";

const meta: Meta = {
  title: "Voorbeeldpagina's/Toepassingen/Samenwerken/Samenwerken overzicht",
};

export default meta;

const SamenwerkenOverzicht = examplePageStory(() => {
  return html`
    <div class="container">
      ${headerPartial(header)}
      <main>
        ${applicationHeadingTemplate({
          title: "Samenwerken aan behandelen",
          subtitle: "Overzicht Samenwerkingen",
        })}
        ${buttonRowTemplate({
          buttons: [{ label: "Samenwerking starten", type: "button", variant: "secondary" }],
        })}
        <div class="dso-table-responsive">
          <table class="table">
            <caption class="sr-only">
              Overzicht van gebruikersnamen
            </caption>
            <thead>
              <tr>
                <th scope="col" class="col-xs-4">Naam Samenwerking</th>
                <th scope="col" class="col-xs-4">Initiator</th>
                <th scope="col" class="col-xs-2">Laatst gewijzigd</th>
                <th scope="col" class="col-xs-2">Actie verzoeken</th>
                <th scope="col" class="col-xs-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  ${linkTemplate({ label: "Boomkappen in de achtertuin", url: "#", modifier: "dso-tertiary" })}
                </th>
                <td>Gemeente Gasselterboerveenschemond</td>
                <td>24-09-20277</td>
                <td>${badgeTemplate({ message: "1", status: "warning" })}</td>
                <td>Open</td>
              </tr>
              <tr>
                <th scope="row">
                  ${linkTemplate({ label: "Boomkappen in de achtertuin", url: "#", modifier: "dso-tertiary" })}
                </th>
                <td>Gemeente Gasselterboerveenschemond</td>
                <td>24-09-20277</td>
                <td>${badgeTemplate({ message: "1", status: "warning" })}</td>
                <td>Open</td>
              </tr>
              <tr>
                <th scope="row">
                  ${linkTemplate({ label: "Boomkappen in de achtertuin", url: "#", modifier: "dso-tertiary" })}
                </th>
                <td>Gemeente Gasselterboerveenschemond</td>
                <td>24-09-20277</td>
                <td>${badgeTemplate({ message: "1", status: "warning" })}</td>
                <td>Open</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      ${footerPartial()}
    </div>
  `;
});

export { SamenwerkenOverzicht };
