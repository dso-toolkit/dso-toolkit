import { html } from "lit-html";
import { examplePageFactory } from "../../example-page-factory";
import { footerPartial } from "../partials/footer";
import { header, breadcrumbs, definitionList } from "./beheer-basis.content";

examplePageFactory(
  "Patronen",
  "Beheer Basis",
  (
    { headerTemplate, breadcrumbsTemplate, buttonTemplate, paginationTemplate, definitionListTemplate, tableTemplate },
    templates
  ) => {
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
              head: ["Ketenpartner", "Toegang", "Acties"],
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
        ${footerPartial(templates)}
      </div>
    `;
  }
);
