import { Breadcrumbs, CardContainer, Header } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";

export const header: Header = {
  subLogo: "Regels op de kaart",
  ribbon: "Beta",
  mainMenu: [
    {
      label: "Home",
      url: "#",
    },
    {
      label: "Vergunningcheck",
      url: "#",
    },
    {
      label: "Aanvragen",
      url: "#",
    },
    {
      label: "Regels op de kaart",
      url: "#",
    },
    {
      label: "Maatregelen op maat",
      url: "#",
    },
  ],
  useDropDownMenu: "always",
  authStatus: "loggedIn",
  loginUrl: "#login",
  logoutUrl: "#logout",
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

export const cardList: CardContainer<TemplateResult> = {
  mode: "list",
  cards: [
    {
      label: "Omgevingsplan gemeente Utrecht",
      content: html`<p>
        Omgevingsplan gemeente Utrecht <br />
        In werking vanaf 03-03-2023
      </p>`,
      selectable: {
        type: "checkbox",
        checked: false,
        disabled: false,
        id: "test",
        indeterminate: false,
        invalid: false,
        label: "Label",
        required: false,
        value: "the-value",
        slot: "selectable",
      },
      interactions: [
        {
          position: "right",
          label: "test",
          children: html`Test informatie`,
        },
      ],
    },
    {
      label: "Chw bestemmingsplan Algemene regels Utrecht",
      content: html`<p>
        Omgevingsplan gemeente Utrecht <br />
        In werking vanaf 03-03-2023 - vastgesteld
      </p>`,
      selectable: {
        type: "checkbox",
        checked: false,
        disabled: false,
        id: "test",
        indeterminate: false,
        invalid: false,
        label: "Label",
        required: false,
        value: "the-value",
        slot: "selectable",
      },
      interactions: [
        {
          position: "right",
          label: "test",
          children: html`Test informatie`,
        },
      ],
    },
    {
      label: "Voorbereidingsbesluit detailhandel en bezorging 2023",
      content: html`<p>
        Omgevingsplan gemeente Utrecht <br />
        In werking vanaf 03-03-2023 - geheel onherroepelijk in werking
      </p>`,
      selectable: {
        type: "checkbox",
        checked: false,
        disabled: false,
        id: "test",
        indeterminate: false,
        invalid: false,
        label: "Label",
        required: false,
        value: "the-value",
        slot: "selectable",
      },
      interactions: [
        {
          position: "right",
          label: "test",
          children: html`Test informatie`,
        },
      ],
    },
  ],
};
