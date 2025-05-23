import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { header } from "../../content/header.content";
import { mainMenu } from "../../content/main-menu.content";
import { footerPartial } from "../../partials/footer";
import { headerPartial } from "../../partials/header";

import { definitions } from "./verzoek-detail.content";

examplePageFactory(
  "Voorbeeldpagina's",
  "Toepassingen/Mijn Omgevingsloket",
  "Verzoek Detail",
  ({ buttonRowTemplate, applicationHeadingTemplate, definitionListTemplate, linkTemplate }, templates) => html`
    <div class="container">
      ${headerPartial(templates, { ...header, mainMenu: mainMenu(), userHomeActive: true, authStatus: "loggedIn" })}
      <main>
        <div class="row">
          <div class="col-md-12">
            ${buttonRowTemplate({
              buttons: [
                { label: "Naar project overzicht", variant: "tertiary", url: "#", icon: { icon: "chevron-left" } },
              ],
            })}
            ${applicationHeadingTemplate({
              title: "Boom kappen in de achtertuin",
              subtitle: "Boom kappen in de achtertuin 1",
            })}
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            ${buttonRowTemplate({
              buttons: [
                { label: "Aanvullen", type: "button", variant: "secondary", icon: { icon: "pencil" } },
                { label: "Intrekken", type: "button", variant: "secondary", icon: { icon: "undo" } },
                { label: "Verwijderen", type: "button", variant: "secondary", icon: { icon: "trash" } },
              ],
            })}
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">${definitionListTemplate(definitions)}</div>
        </div>
        <div class="row">
          <div class="col-md-6">
            ${buttonRowTemplate({
              buttons: [
                { label: "Download verzoek als PDF", type: "button", variant: "secondary", icon: { icon: "download" } },
              ],
            })}
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <hr />
            <h3>Bijlagen</h3>
            ${buttonRowTemplate({
              buttons: [
                { label: "Download alle bijlagen", type: "button", variant: "secondary", icon: { icon: "download" } },
              ],
            })}
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <table class="table dso-table-responsive">
              <caption class="sr-only">
                Overzicht van gebruikersnamen
              </caption>
              <thead>
                <tr>
                  <th scope="col" class="col-xs-7">Bestandsnaam</th>
                  <th scope="col" class="col-xs-3">Vertrouwelijk</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    ${linkTemplate({
                      label: "Brief opzichter de koning.doc",
                      url: "#",
                      modifier: "dso-tertiary",
                      icon: { icon: "download" },
                    })}
                  </th>
                  <td>Ja</td>
                </tr>
                <tr>
                  <th scope="row">
                    ${linkTemplate({
                      label: "Boom-23.jpg",
                      url: "#",
                      modifier: "dso-tertiary",
                      icon: { icon: "download" },
                    })}
                  </th>
                  <td>Nee</td>
                </tr>
                <tr>
                  <th scope="row">
                    ${linkTemplate({
                      label: "Straat-overzichr-boom23.jpg",
                      url: "#",
                      modifier: "dso-tertiary",
                      icon: { icon: "download" },
                    })}
                  </th>
                  <td>Nee</td>
                </tr>
                <tr>
                  <th scope="row">
                    ${linkTemplate({
                      label: "Brochure-gemeente-Den-Haag.pdf",
                      url: "#",
                      modifier: "dso-tertiary",
                      icon: { icon: "download" },
                    })}
                  </th>
                  <td>Ja</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            ${buttonRowTemplate({
              buttons: [
                {
                  variant: "tertiary",
                  label: "Naar project overzicht",
                  url: "#",
                  icon: { icon: "chevron-left" },
                },
              ],
            })}
          </div>
        </div>
      </main>
      ${footerPartial(templates)}
    </div>
  `,
);
