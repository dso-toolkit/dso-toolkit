import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { footerPartial } from "../../partials/footer";
import { headerPartial } from "../../partials/header";
import { header } from "./samenwerken-overzicht.content";

examplePageFactory(
  "Toepassingen/Samenwerken",
  "Samenwerken overzicht",
  ({ anchorTemplate, buttonTemplate, applicationHeadingTemplate, badgeTemplate }, templates) => html`
    <div class="container">
      ${headerPartial(templates, header)}
      <main>
        ${applicationHeadingTemplate({
          title: "Samenwerken aan behandelen",
          subtitle: "Overzicht Samenwerkingen",
        })}
        <div class="dso-button-row">
          ${buttonTemplate({
            label: "Samenwerking starten",
            type: "button",
            variant: "secondary",
          })}
        </div>

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
                  ${anchorTemplate({ label: "Boomkappen in de achtertuin", url: "#", modifier: "dso-tertiary" })}
                </th>
                <td>Gemeente Gasselterboerveenschemond</td>
                <td>24-09-20277</td>
                <td>${badgeTemplate({ message: "1", status: "warning" })}</td>
                <td>Open</td>
              </tr>
              <tr>
                <th scope="row">
                  ${anchorTemplate({ label: "Boomkappen in de achtertuin", url: "#", modifier: "dso-tertiary" })}
                </th>
                <td>Gemeente Gasselterboerveenschemond</td>
                <td>24-09-20277</td>
                <td>${badgeTemplate({ message: "1", status: "warning" })}</td>
                <td>Open</td>
              </tr>
              <tr>
                <th scope="row">
                  ${anchorTemplate({ label: "Boomkappen in de achtertuin", url: "#", modifier: "dso-tertiary" })}
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
  `
);
