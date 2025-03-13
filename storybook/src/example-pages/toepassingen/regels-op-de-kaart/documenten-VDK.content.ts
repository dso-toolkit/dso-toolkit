import {
  AdvancedSelect,
  Breadcrumbs,
  Card,
  CardContainer,
  DefinitionList,
  Header,
  Navbar,
  PlekinfoCard,
} from "dso-toolkit";
import { html, TemplateResult } from "lit-html";

export const header: Header = {
  label: "Regels op de kaart",
  ribbon: "beta",
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
      active: true,
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

const cardDefault: Card<TemplateResult> = {
  href: "#",
  label: "Omgevingsplan gemeente Utrecht",
  content: html`<p>
    Omgevingsplan gemeente Utrecht <br />
    In werking vanaf 03-03-2023
  </p>`,
  interactions: [
    {
      position: "right",
      label: "test",
      children: html`Test informatie`,
    },
  ],
};

export const features: DefinitionList<TemplateResult> = {
  modifier: "dso-document-header-features",
  definitions: [],
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

export const cardList: CardContainer<TemplateResult> = {
  mode: "list",
  cards: [
    { ...cardDefault },
    {
      ...cardDefault,
      label: "Chw bestemmingsplan Algemene regels Harderwijk",
      content: html`<p>
        Omgevingsplan gemeente Utrecht <br />
        In werking vanaf 03-03-2023 - vastgesteld
      </p>`,
    },
    {
      ...cardDefault,
      label: "Voorbereidingsbesluit detailhandel en bezorging 2023",
    },
    {
      ...cardDefault,
      label: "Voorbereidingsbesluit detailhandel en bezorging 2023",
    },
    {
      ...cardDefault,
      label: "Voorbereidingsbesluit detailhandel en bezorging 2023",
    },
    {
      ...cardDefault,
      label: "Detailhandel en bezorging 2023",
    },
  ],
};

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
