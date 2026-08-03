import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { applicationHeadingTemplate } from "../../../components/application-heading/application-heading.template.js";
import { buttonRowTemplate } from "../../../components/button-row/button-row.template.js";
import { contextTemplate } from "../../../components/context/context.template.js";
import { projectItemTemplate } from "../../../components/project-item/project-item.template.js";
import { searchBarTemplate } from "../../../components/search-bar/search-bar.template.js";
import { examplePageStory } from "../../../example-page-story.js";
import { header } from "../../content/header.content.js";
import { mainMenu } from "../../content/main-menu.content.js";
import { footerPartial } from "../../partials/footer.js";
import { headerPartial } from "../../partials/header.js";

const meta: Meta = {
  title: "Voorbeeldpagina's/Toepassingen/Mijn Omgevingsloket/Mijn Projecten",
};

export default meta;

const MijnProjecten = examplePageStory(() => {
  return html`
    <div class="container">
      ${headerPartial({
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
              { label: "Actiecode invoeren", type: "button", variant: "secondary", icon: { icon: "mail-outline" } },
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
                            term: html`Ingediende verzoeken`,
                            descriptions: [{ content: "4" }],
                          },
                          {
                            term: html`In te dienen activiteiten`,
                            descriptions: [{ content: "16" }],
                          },
                        ],
                      },
                      status: {
                        definitions: [
                          {
                            term: html`Locatie`,
                            descriptions: [{ content: "Getekend gebied" }],
                          },
                          {
                            term: html`Mijn rol`,
                            descriptions: [{ content: "Gemachtigde" }],
                          },
                          {
                            term: html`Laatste wijziging`,
                            descriptions: [{ content: "12-09-2023" }],
                          },
                        ],
                      },
                      actions: [
                        {
                          label: "Bewerk",
                          variant: "tertiary",
                          icon: "pencil",
                        },
                        {
                          label: "Verwijder",
                          variant: "tertiary",
                          icon: "trash",
                        },
                      ],
                    })}
                  </li>`,
              )}
            </ul>
          `,
        })}
      </main>

      ${footerPartial()}
    </div>
  `;
});

export { MijnProjecten };
