import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { footerPartial } from "../../partials/footer";
import { headerPartial } from "../../partials/header";
import { header } from "../../partials/header.content";
import { mainMenu } from "./mijn-projecten.content";

examplePageFactory(
  "Toepassingen/Mijn Omgevingsloket",
  "Mijn Projecten",
  (
    {
      applicationHeadingTemplate,
      contextTemplate,
      buttonTemplate,
      buttonRowTemplate,
      searchBarTemplate,
      anchorTemplate,
      labelTemplate,
    },
    templates
  ) => html`
    <div class="container">
      ${headerPartial(templates, { ...header, mainMenu: mainMenu })}

      <main>
        ${applicationHeadingTemplate({ title: "Mijn projecten" })}
        ${contextTemplate({
          type: "label",
          label: buttonRowTemplate({
            buttons: [
              { label: "Nieuw project", type: "button", variant: "secondary", icon: { icon: "plus" } },
              { label: "Actiecode invoeren", type: "button", variant: "secondary", icon: { icon: "email" } },
            ],
          }),
          content: searchBarTemplate({
            buttonLabel: "Zoeken",
            label: "Zoeken in projecten",
            placeholder: "Zoeken in projecten",
            hideSearchButton: true,
            hiddenLabel: true,
            icon: true,
            id: "mijn-projecten-searchbar",
          }),
          children: html`
            <div class="dso-table-responsive">
              <table class="table">
                <caption class="sr-only">
                  Overzicht van gebruikersnamen
                </caption>
                <thead>
                  <tr>
                    <th scope="col" class="col-xs-7">Projectnaam</th>
                    <th scope="col" class="col-xs-3">Rol</th>
                    <th scope="col" class="col-xs-2">
                      <span class="sr-only">Acties</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      ${anchorTemplate({ label: "Boomkappen in de achtertuin", url: "#", modifier: "dso-tertiary" })}
                      ${labelTemplate({ label: "Wordt verwijderd op 31-12-2023", status: "danger" })}
                    </th>
                    <td>Initiatiefnemer</td>
                    <td class="text-right">
                      ${buttonTemplate({
                        label: "Boomkappen in de achtertuin aanpassen",
                        type: "button",
                        variant: "tertiary",
                        icon: { icon: "pencil" },
                        iconMode: "only",
                      })}
                      ${buttonTemplate({
                        label: "Boomkappen in de achtertuin verwijderen",
                        type: "button",
                        variant: "tertiary",
                        icon: { icon: "trash" },
                        iconMode: "only",
                        tooltip: {
                          label: "Verwijderen",
                          position: "top",
                        },
                      })}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">${anchorTemplate({ label: "Project 9", url: "#", modifier: "dso-tertiary" })}</th>
                    <td>Initiatiefnemer</td>
                    <td class="text-right">
                      ${buttonTemplate({
                        label: "Project 9 aanpassen",
                        type: "button",
                        variant: "tertiary",
                        icon: { icon: "pencil" },
                        iconMode: "only",
                      })}
                      ${buttonTemplate({
                        label: "Project 9 verwijderen",
                        type: "button",
                        variant: "tertiary",
                        icon: { icon: "trash" },
                        iconMode: "only",
                        tooltip: {
                          label: "Verwijderen",
                          position: "top",
                        },
                      })}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">${anchorTemplate({ label: "Project 8", url: "#", modifier: "dso-tertiary" })}</th>
                    <td>Initiatiefnemer</td>
                    <td class="text-right">
                      ${buttonTemplate({
                        label: "Project 8 aanpassen",
                        type: "button",
                        variant: "tertiary",
                        icon: { icon: "pencil" },
                        iconMode: "only",
                      })}
                      ${buttonTemplate({
                        label: "Project 8 verwijderen",
                        type: "button",
                        variant: "tertiary",
                        icon: { icon: "trash" },
                        iconMode: "only",
                        tooltip: {
                          label: "Verwijderen",
                          position: "top",
                        },
                      })}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">${anchorTemplate({ label: "Project 7", url: "#", modifier: "dso-tertiary" })}</th>
                    <td>Gemachtigde</td>
                    <td class="text-right">
                      ${buttonTemplate({
                        label: "Project 7 aanpassen",
                        type: "button",
                        variant: "tertiary",
                        icon: { icon: "pencil" },
                        iconMode: "only",
                      })}
                      ${buttonTemplate({
                        label: "Project 7 verwijderen",
                        type: "button",
                        variant: "tertiary",
                        icon: { icon: "trash" },
                        iconMode: "only",
                        tooltip: {
                          label: "Verwijderen",
                          position: "top",
                        },
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          `,
        })}
      </main>

      ${footerPartial(templates)}
    </div>
  `
);
