import { Breadcrumbs, Header, DefinitionList, Tabs } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";
import { Templates } from "../../../templates";

export const header: Header = {
  label: "Regels op de kaart",
  ribbon: "beta",
  mainMenu: [
    {
      label: "Behandelen",
      url: "#",
    },
  ],
  useDropDownMenu: "auto",
  authStatus: "loggedIn",
  loginUrl: "#login",
  logoutUrl: "#logout",
  showHelp: true,
  helpUrl: "#help",
  userProfileName: "J.A. Jansen",
  userProfileUrl: "#profiel",
};

export const breadcrumbs: Breadcrumbs = {
  breadcrumbs: [
    {
      label: "Test",
      url: "#",
    },
  ],
};

export function items({ buttonRowTemplate, definitionListTemplate }: Templates): Tabs<TemplateResult> {
  return {
    items: [
      {
        label: "Samenwerkingsgegevens",
        modifiers: "active",
        identifier: "Uniek-id1",
      },
      {
        label: "Documenten",
        identifier: "uniekID-2",
      },
      {
        label: "Ketenpartners",
        identifier: "uniekID-3",
      },
      {
        label: "Actieverzoeken",
        identifier: "uniekID-4",
      },
    ],
    content: html`
      <h2>Samenwerkingsgegevens</h2>
      ${buttonRowTemplate({
        buttons: [{ label: "Samenwerking aanpassen", type: "button", variant: "secondary" }],
      })}
      <div class="row">
        <div class="col-md-4">${definitionListTemplate(definitions)}</div>
        <div class="col-md-4">
          <p><strong>Beschrijving</strong></p>
          <p>Een korte paragraaf over deze samenwerkingspartner in het algemeen.</p>
        </div>
      </div>
    `,
  };
}

export const definitions: DefinitionList<TemplateResult> = {
  definitions: [
    {
      term: html`Initiator:`,
      descriptions: [
        {
          content: html`Gemeente Den Haag`,
        },
      ],
    },
    {
      term: html`Verzoeknummer:`,
      descriptions: [
        {
          content: html`12123497987`,
        },
      ],
    },
    {
      term: html`Status:`,
      descriptions: [
        {
          content: html`Open`,
        },
      ],
    },
    {
      term: html`Status:`,
      descriptions: [
        {
          content: html`Open`,
        },
      ],
    },
    {
      term: html`Creatie datum:`,
      descriptions: [
        {
          content: html`23-09-2019`,
        },
      ],
    },
    {
      term: html`Contactpersoon:`,
      descriptions: [
        {
          content: html`Jan van Veen`,
        },
      ],
    },
    {
      term: html`Emailadres:`,
      descriptions: [
        {
          content: html`Janvanveen@testmail.nl`,
        },
      ],
    },
    {
      term: html`Telefoonnummer:`,
      descriptions: [
        {
          content: html`0639722566`,
        },
      ],
    },
  ],
};
