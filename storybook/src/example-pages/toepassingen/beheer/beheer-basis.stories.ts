import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { breadcrumbsTemplate } from "../../../components/breadcrumbs/breadcrumbs.template.js";
import { buttonTemplate } from "../../../components/button/button.template.js";
import { definitionListTemplate } from "../../../components/definition-list/definition-list.template.js";
import { headerTemplate } from "../../../components/header/header.template.js";
import { paginationTemplate } from "../../../components/pagination/pagination.template.js";
import { tableTemplate } from "../../../components/table/table.template.js";
import { examplePageStory } from "../../../example-page-story.js";
import { footerPartial } from "../../partials/footer.js";

import { breadcrumbs, definitionList, header } from "./beheer-basis.content.js";

const meta: Meta = {
  title: "Voorbeeldpagina's/Toepassingen/Beheer",
};

export default meta;

const Beheer = examplePageStory(() => {
  const rowActions = () =>
    html`${buttonTemplate({
      type: "button",
      variant: "tertiary",
      label: "Bewerk",
      icon: { icon: "pencil" },
      iconMode: "only",
    })}
    ${buttonTemplate({
      type: "button",
      variant: "tertiary",
      label: "Verwijder",
      icon: { icon: "trash" },
      iconMode: "only",
    })}`;

  return html`
    <div class="container">
      <header>${headerTemplate(header)} ${breadcrumbsTemplate(breadcrumbs)}</header>
      <main>
        <h1>Titel van beheer-applicatie</h1>
        <h2>Subtitel voor de meta-data</h2>
        <hr />
        ${definitionListTemplate(definitionList)}
        <hr />
        <h2>Subtitel voor het tabeloverzicht</h2>
        ${tableTemplate({
          noModal: true,
          content: {
            caption: "Titel van de tabel voor screenreaders",
            head: [{ label: "Ketenpartner" }, { label: "Toegang" }, { label: "Acties" }],
            rows: [
              ["Gemeente Den Haag", "Alle documenten", rowActions()],
              ["Gemeente Rotterdam", "Alle documenten", rowActions()],
              ["Gemeente IJsselstein", "Alleen niet vertrouwelijke documenten", rowActions()],
              ["Gemeente Delft", "Alle documenten", rowActions()],
              ["Gemeente Eindhoven", "Alleen niet vertrouwelijke documenten", rowActions()],
              ["Gemeente Tilburg", "Alle documenten", rowActions()],
              ["Gemeente Breda", "Alle documenten", rowActions()],
              ["Gemeente Maastricht", "Alle documenten", rowActions()],
              ["Gemeente Amsterdam", "Alleen niet vertrouwelijke documenten", rowActions()],
              ["Gemeente Utrecht", "Alleen niet vertrouwelijke documenten", rowActions()],
            ],
          },
        })}
        ${paginationTemplate({ totalPages: 5, currentPage: 3 })}
      </main>
      ${footerPartial()}
    </div>
  `;
});

export { Beheer };
