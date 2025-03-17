import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { header } from "../../content/header.content";
import { mainMenu } from "../../content/main-menu.content";
import { footerPartial } from "../../partials/footer";
import { headerPartial } from "../../partials/header";

examplePageFactory(
  "Voorbeeldpagina's",
  "Toepassingen/Mijn Omgevingsloket",
  "Mijn Projecten",
  (
    {
      applicationHeadingTemplate,
      contextTemplate,
      buttonRowTemplate,
      searchBarTemplate,
      helpcenterPanelTemplate,
      projectItemTemplate,
    },
    templates,
  ) => html`
    <div class="container">
      ${headerPartial(templates, {
        ...header,
        mainMenu: mainMenu(),
        userHomeActive: true,
        authStatus: "loggedIn",
      })}
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
            <ul class="dso-list-unstyled">
              ${[1, 2, 3, 4].map(
                (n) =>
                  html` <li>
                    ${projectItemTemplate({
                      title: `Boomkappen in de achtertuin ${n}`,
                      href: "#",
                      label: n % 3 === 0 ? "Wordt verwijderd op 31-12-2023" : undefined,
                      progress: {
                        definitions: [
                          {
                            term: "Ingediende verzoeken",
                            descriptions: [{ content: "4" }],
                          },
                          {
                            term: "In te dienen activiteiten",
                            descriptions: [{ content: "16" }],
                          },
                        ],
                      },
                      status: {
                        definitions: [
                          {
                            term: "Locatie",
                            descriptions: [{ content: "Getekend gebied" }],
                          },
                          {
                            term: "Mijn rol",
                            descriptions: [{ content: "Gemachtigde" }],
                          },
                          {
                            term: "Laatste wijziging",
                            descriptions: [{ content: "12-09-2023" }],
                          },
                        ],
                      },
                      actions: [
                        {
                          label: "Bewerk",
                          type: "button",
                          variant: "tertiary",
                          icon: {
                            icon: "pencil",
                          },
                          iconMode: "only",
                        },
                        {
                          label: "Verwijder",
                          type: "button",
                          variant: "tertiary",
                          icon: {
                            icon: "trash",
                          },
                          iconMode: "only",
                        },
                      ],
                    })}
                  </li>`,
              )}
            </ul>
          `,
        })}
      </main>

      ${helpcenterPanelTemplate({
        url: location.host.startsWith("localhost") ? "/" : "https://dso-toolkit.nl/",
      })}
      ${footerPartial(templates)}
    </div>
  `,
);
