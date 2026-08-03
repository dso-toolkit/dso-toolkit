import { TemplateResult, html } from "lit-html";

import type { Breadcrumbs } from "../../../components/breadcrumbs/breadcrumbs.models.js";
import { buttonRowTemplate } from "../../../components/button-row/button-row.template.js";
import type { DefinitionList } from "../../../components/definition-list/definition-list.models.js";
import { definitionListTemplate } from "../../../components/definition-list/definition-list.template.js";
import type { Header } from "../../../components/header/header.models.js";
import type { Tabs } from "../../../components/tabs/tabs.models.js";

export const header: Header = {
  label: "Regels op de kaart",
  ribbon: "beta",
  mainMenu: [
    {
      label: "Behandelen",
      url: "#",
    },
  ],
  compact: "auto",
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

export function items(): Tabs<TemplateResult> {
  return {
    items: [
      {
        label: "Samenwerkingsgegevens",
        modifier: "active",
      },
      {
        label: "Documenten",
      },
      {
        label: "Ketenpartners",
      },
      {
        label: "Actieverzoeken",
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
