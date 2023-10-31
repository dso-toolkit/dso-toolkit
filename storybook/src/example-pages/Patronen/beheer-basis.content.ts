import { Breadcrumbs, DefinitionList, Header } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";

export const header: Header = {
  ribbon: "beta",
  mainMenu: [
    {
      label: "Menu titel A",
      url: "#",
      active: true,
    },
    {
      label: "Menu titel B",
      url: "#",
    },
    {
      label: "Menu titel C",
      url: "#",
    },
  ],
  useDropDownMenu: "auto",
  authStatus: "none",
  loginUrl: "#login",
  logoutUrl: "#logout",
  showHelp: false,
  userProfileName: "J.A. Jansen",
  userProfileUrl: "#profiel",
  userHomeUrl: "#myhome",
};

export const breadcrumbs: Breadcrumbs = {
  breadcrumbs: [
    {
      label: "Home",
      url: "#",
    },
    {
      label: "Menu titel A",
      url: "#",
    },
  ],
};

export const definitionList: DefinitionList<TemplateResult> = {
  modifier: "dso-columns dso-3-columns",
  definitions: [
    {
      term: html`Aangemaakt door:`,
      descriptions: [
        {
          content: "Gemeente Rotterdam",
        },
      ],
    },
    {
      term: html`Verzoeknummer:`,
      descriptions: [
        {
          content: "12123497987",
        },
      ],
    },
    {
      term: html`Status:`,
      descriptions: [
        {
          content: "Open",
        },
      ],
    },
    {
      term: html`Contactpersoon:`,
      descriptions: [
        {
          content: "Jan van Veen",
        },
      ],
    },
    {
      term: html`Emailadres:`,
      descriptions: [
        {
          content: "j.veen@testmail.nl",
        },
      ],
    },
    {
      term: html`Telefoonnummer:`,
      descriptions: [
        {
          content: "06-12345678",
        },
      ],
    },
    {
      term: html`Creatie datum:`,
      descriptions: [
        {
          content: "17-12-2019",
        },
      ],
    },
    {
      term: html`Beschrijving:`,
      descriptions: [
        {
          content: "-",
        },
      ],
    },
  ],
};
