import {
  AdvancedSelect,
  Breadcrumbs,
  DefinitionList,
  DocumentCard,
  Header,
  Navbar,
  PlekinfoCard,
  TabsItem,
} from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

import { mainMenu } from "../../content/main-menu.content";

export const header: Header = {
  label: "Regels op de kaart",
  ribbon: "beta",
  mainMenu: mainMenu("Regels op de kaart"),
  useDropDownMenu: "always",
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

export const features: DefinitionList<TemplateResult> = {
  modifier: "dso-document-header-features",
  definitions: [
    {
      term: html`Opschrift:`,
      descriptions: [
        {
          content: "Besluit van 3 juli 2018, houdende regels over activiteiten in de fysieke leefomgeving",
        },
      ],
    },
    {
      term: html`Identificatie:`,
      descriptions: [
        {
          content: "/akn/nl/act/mnre1034/2021/BWBR0041330",
        },
      ],
    },
  ],
};

export const advancedSelect: AdvancedSelect<unknown> = {
  options: [
    {
      label: "Geldende versie",
      variant: "success",
      redirect: {
        href: "#",
        label: "Bekijk eerder vastgestelde versies",
      },
      options: [
        {
          label: "In werking (laatst gewijzigd: 01-01-2024)",
        },
      ],
    },
    {
      label: "Toekomstige versies",
      activeLabel: "Toekomstig",
      summaryCounter: true,
      options: [
        {
          label: "Citeertitel van het besluit (In werking per 01-03-2024)",
        },
        {
          label: "Citeertitel van het besluit (In werking per 01-04-2024)",
        },
      ],
    },
    {
      label: "Ontwerp versies ter inzage",
      activeLabel: "Ontwerp",
      variant: "warning",
      redirect: {
        href: "#",
        label: "Bekijk ontwerpen met afgeronde inzage termijn",
      },
      summaryCounter: true,
      options: [
        {
          label: "Verandering in annotaties (Einde inzage: 01-02-2024)",
        },
        {
          label: "Herziening Achterwillense-weg 12-34 (Einde inzage: 08-02-2024)",
        },
        {
          label:
            "Algemene regels voor het beheer en onderhoud van waterstaatswerken en het gebruik van watersystemen (Keur waterschap Vechtstromen 2020) (Einde inzage: 09-02-2024)",
        },
      ],
    },
    {
      label: "Groep met placeholder",
      placeholder: "Er zijn alleen ontwerpen met een afgeronde inzage termijn voor dit document.",
      redirect: {
        href: "#",
        label: "Bekijk ontwerpen met afgeronde inzage termijn",
      },
    },
  ],
};

const documentCardDefault: DocumentCard<TemplateResult> = {
  href: "#",
  label: "Omgevingsplan gemeente Apeldoorn",
  status: "In werking vanaf 03-03-2023",
  typeItems: [
    html`<span class="dso-document-card-type-item">Omgevingsplan</span>`,
    html`<span class="dso-document-card-type-item">Gemeente Apeldoorn</span>`,
  ],
  typeToelichting: {
    children: "Extra informatie",
    label: "Toon informatie over type",
    position: "right",
    small: false,
    secondary: false,
  },
};

export const documentCardList: DocumentCard<TemplateResult>[] = [
  documentCardDefault,
  { ...documentCardDefault, label: "Chw bestemmingsplan Algemene regels Apeldoorn" },
  { ...documentCardDefault, label: "TAM-voorbereidingsbesluit voorbeschermingsregels" },
];

export const mainSubmenu: Navbar<TemplateResult> = {
  open: false,
  modifier: "sub",
  items: [
    {
      label: "Gemeente",
      active: true,
      href: "#",
    },
    {
      label: "Provincie",
      href: "#",
    },
    {
      label: "Waterschap",
      href: "#",
    },
    {
      label: "Rijk",
      href: "#",
    },
  ],
};

export const documentPanelSubmenu: Navbar<TemplateResult> = {
  open: false,
  modifier: "sub",
  items: [
    {
      label: "Plekinfo",
      active: true,
      href: "#",
    },
    {
      label: "Overzicht",
      href: "#",
    },
    {
      label: "Regels",
      href: "#",
    },
    {
      label: "Bijlagen",
      href: "#",
    },
    {
      label: "Kaarten",
      href: "#",
    },
    {
      label: "Toelichting",
      href: "#",
    },
  ],
};

const plekInfoCardDefault: PlekinfoCard<TemplateResult> = {
  href: "#",
  targetBlank: false,
  interaction: {
    checked: false,
    accessibleLabel: "sr-only label van het schuifje",
  },
  label: "Aanvraagvereisten binnenplanse omgevingsvergunning omgevingsplanactiviteit bouwwerken",
  active: false,
};

export const plekinfoCardsListActiviteiten: PlekinfoCard<TemplateResult>[] = [
  { ...plekInfoCardDefault },
  {
    ...plekInfoCardDefault,
    label: "Acculader in werking hebben",
  },
  {
    ...plekInfoCardDefault,
    label: "Activiteit gereguleerd in omgevingsplanregels van rijkswege",
  },
  {
    ...plekInfoCardDefault,
    label: "Activiteit die betrekking heeft op een gemeentelijk monument",
  },
];

export const plekinfoCardsListLocaties: PlekinfoCard<TemplateResult>[] = [
  {
    ...plekInfoCardDefault,
    label: "ambtsgebied",
  },
  {
    ...plekInfoCardDefault,
    label: "Ambtsgebied Gemeente Midden-Groningen",
  },
];

export const tabItems: TabsItem[] = [
  {
    label: "Locatie zoeken",
    modifier: "active",
    href: "#",
  },
  {
    label: "Documenten zoeken",
    href: "#",
  },
];
