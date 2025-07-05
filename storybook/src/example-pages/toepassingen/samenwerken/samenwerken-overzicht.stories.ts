import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { examplePageStories } from "../../../example-page-stories";
import { footerPartial } from "../../partials/footer";
import { headerPartial } from "../../partials/header";

import { header } from "./samenwerken-overzicht.content";

const meta: Meta = {
  title: "Voorbeeldpagina's/Toepassingen/Samenwerken/Samenwerken overzicht",
};

export default meta;

const SamenwerkenOverzicht = examplePageStories((templates) => {
  const { linkTemplate, buttonRowTemplate, applicationHeadingTemplate, badgeTemplate } = templates;

  return html`
    <div class="container">
      ${headerPartial(templates, header)}
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
      ${footerPartial(templates)}
    </div>
  `;
});

export { SamenwerkenOverzicht };
