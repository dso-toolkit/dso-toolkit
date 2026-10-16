import { html } from "lit-html";

import { AccordionSection } from "../../../components/accordion/accordion.models.js";
import { accordionTemplate } from "../../../components/accordion/accordion.template.js";
import { AdvancedSelect } from "../../../components/advanced-select/advanced-select.models.js";
import { Breadcrumbs } from "../../../components/breadcrumbs/breadcrumbs.models.js";
import { cardContainerTemplate } from "../../../components/card-container/card-container.template.js";
import { DocumentCard } from "../../../components/document-card/document-card.models.js";
import { Header } from "../../../components/header/header.models.js";
import { Navbar } from "../../../components/navbar/navbar.models.js";
import { symbol } from "../../../components/plekinfo-card/plekinfo-card.content.js";
import { PlekinfoCard } from "../../../components/plekinfo-card/plekinfo-card.models.js";
import { TabsItem } from "../../../components/tabs/tabs.models.js";
import { mainMenu } from "../../content/main-menu.content.js";

export function header(): Header {
  return {
    label: "Regels op de kaart",
    ribbon: "beta",
    mainMenu: mainMenu("Regels op de kaart"),
    compact: "always",
    authStatus: "loggedIn",
    loginUrl: "#login",
    logoutUrl: "#logout",
    showHelp: true,
    helpUrl: "#help",
    userProfileName: "J.A. Jansen",
    userProfileUrl: "#profiel",
  };
}

export function breadcrumbs(): Breadcrumbs {
  return {
    breadcrumbs: [
      {
        label: "Test",
        url: "#",
      },
    ],
  };
}

export function advancedSelect(): AdvancedSelect {
  return {
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
}

function documentCardDefault(): DocumentCard {
  return {
    href: "#",
    label: "Omgevingsplan gemeente Apeldoorn",
    status: "In werking vanaf 03-03-2023",
    typeItems: [
      html`<span class="dso-document-card-type-item">Omgevingsplan</span>`,
      html`<span class="dso-document-card-type-item">Gemeente Apeldoorn</span>`,
    ],
    typeToelichting: {
      children: html`<div class="dso-rich-content"><p>Extra informatie</p></div>`,
      label: "Toon informatie over type",
      toggletipPlacement: "right",
    },
  };
}

export function documentCardList(): DocumentCard[] {
  return [
    documentCardDefault(),
    { ...documentCardDefault(), label: "Chw bestemmingsplan Algemene regels Apeldoorn" },
    { ...documentCardDefault(), label: "TAM-voorbereidingsbesluit voorbeschermingsregels" },
  ];
}

export function mainSubmenu(): Navbar {
  return {
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
}

export function documentPanelSubmenu(): Navbar {
  return {
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
}

interface PlekinfoGroep {
  naam: string;
  aantal: number;
  kaarten: PlekinfoCard[];
}

function toonOpKaart() {
  return { checked: false, accessibleLabel: "Toon gebied op de kaart" };
}

function kaartMetSymbool(heading: string, uit?: string): PlekinfoCard {
  return {
    heading,
    href: "#",
    targetBlank: false,
    interaction: toonOpKaart(),
    symbool: symbol("vgz023"),
    content: uit ? html`<p>Uit: ${uit}</p>` : undefined,
  };
}

function kaartMetItems(heading: string, items: Array<[label: string, sublabel?: string]>): PlekinfoCard {
  return {
    heading,
    href: "#",
    targetBlank: false,
    interaction: toonOpKaart(),
    items: items.map(([label, sublabel]) => ({ symbool: symbol("vszt030"), label, sublabel })),
  };
}

function groepen(lijst: PlekinfoGroep[]) {
  return accordionTemplate({
    variant: "compact-black",
    sections: lijst.map(({ naam, aantal, kaarten }) => ({
      handleTitle: `${naam} (${aantal})`,
      heading: "h5",
      open: true,
      content: cardContainerTemplate({ mode: "list", cards: kaarten }),
    })),
  });
}

function gebiedsaanwijzingen(): PlekinfoGroep[] {
  return [
    {
      naam: "beperkingengebied",
      aantal: 3,
      kaarten: [
        kaartMetSymbool("Gebruik van laserstralen", "Voorbeschermingsregels luchthavenbesluit Eelde"),
        kaartMetSymbool(
          "Goede werking apparatuur luchtverkeersdienstverlening",
          "Voorbeschermingsregels luchthavenbesluit Eelde",
        ),
        kaartMetSymbool("Vliegveiligheid", "Voorbeschermingsregels luchthavenbesluit Eelde"),
      ],
    },
    {
      naam: "bodem",
      aantal: 3,
      kaarten: [
        kaartMetSymbool("bodemfunctieklasse - GR2L"),
        kaartMetSymbool("bodemkwaliteitsklasse - bovengrond - wonen"),
        kaartMetSymbool("bodemkwaliteitsklasse - ondergrond - wonen"),
      ],
    },
    {
      naam: "functie",
      aantal: 6,
      kaarten: [
        kaartMetSymbool("aandachtsgebied archeologische verwachting"),
        kaartMetSymbool("bodembeheergebied"),
        kaartMetSymbool("geluidaandachtsgebied wegen"),
        kaartMetSymbool("geluidzone industrie Zuidoost"),
        kaartMetSymbool("gemeentelijk monument"),
        kaartMetSymbool("monumentale bomen en houtopstand"),
      ],
    },
  ];
}

function omgevingsnormen(): PlekinfoGroep[] {
  return [
    {
      naam: "bouwhoogte",
      aantal: 3,
      kaarten: [
        kaartMetItems("maximale bouwhoogte boven NAP: DVORDME Windturbine", [["51 meter"]]),
        kaartMetItems("maximale bouwhoogte boven NAP: Outer horizontal", [["154 meter"]]),
        kaartMetItems("maximale bouwhoogte boven NAP: TAR Eelde", [["68 meter"]]),
      ],
    },
    {
      naam: "maximum bebouwde oppervlakte",
      aantal: 3,
      kaarten: [
        kaartMetItems("bebouwde oppervlakte - achtererfgebied - maximum", [["50 vierkante meter"]]),
        kaartMetItems("bebouwde oppervlakte - bouwwerken met een dak - achtererfgebied - maximum", [
          ["50 vierkante meter"],
        ]),
        kaartMetItems(
          "bebouwde oppervlakte - gebouwen - buiten gebied hoofdgebouwen en gebied bouwwerken met een dak - maximum",
          [["50 vierkante meter"]],
        ),
      ],
    },
    {
      naam: "maximum bebouwingspercentage",
      aantal: 1,
      kaarten: [kaartMetItems("bebouwingspercentage - achtererfgebied - maximum", [["50 procent"]])],
    },
    {
      naam: "maximum bouwhoogte",
      aantal: 6,
      kaarten: [
        kaartMetItems("bouwhoogte - bouwwerk met een dak - maximum", [["6 meter"]]),
        kaartMetItems("bouwhoogte - bouwwerk zonder een dak - geen erf- perceel- of terreinafscheiding - maximum", [
          ["6 meter"],
        ]),
        kaartMetItems("bouwhoogte - bouwwerk zonder een dak - maximum", [["5 meter"]]),
        kaartMetItems("bouwhoogte - hoofdgebouw - maximum", [["10 meter"]]),
        kaartMetItems("bouwhoogte - erf- of terreinafscheiding - voor voorgevelrooilijn - maximum", [["1 meter"]]),
        kaartMetItems("bouwhoogte - erf- of terreinafscheiding - achter voorgevelrooilijn - maximum", [["2 meter"]]),
      ],
    },
    {
      naam: "maximum goothoogte",
      aantal: 1,
      kaarten: [kaartMetItems("goothoogte - hoofdgebouw - maximum", [["4 meter"]])],
    },
    {
      naam: "minimum vloeroppervlakte",
      aantal: 1,
      kaarten: [kaartMetItems("gebruiksoppervlakte - zelfstandige woning - minimum", [["50 vierkante meter"]])],
    },
  ];
}

function activiteiten(): PlekinfoGroep[] {
  return [
    {
      naam: "maatschappelijke activiteit",
      aantal: 3,
      kaarten: [
        kaartMetItems("Kinderopvang", [
          ["toegestaan", "in: kinderopvang - toestemmingsvrij"],
          ["", "in: kinderopvang - toestemmingsvrij"],
        ]),
        kaartMetItems("Levensbeschouwelijke instellingen", [
          ["", "in: levensbeschouwelijke instellingen - toestemmingsvrij"],
          ["toegestaan", "in: levensbeschouwelijke instellingen - toestemmingsvrij"],
        ]),
        kaartMetItems("Overige medische activiteiten", [["", "in: overige medische activiteiten - toestemmingsvrij"]]),
      ],
    },
    {
      naam: "milieubelastende activiteit",
      aantal: 52,
      kaarten: [
        "Acculader in werking hebben",
        "Activiteit op een locatie met historische bodemverontreiniging zonder onaanvaardbaar risico",
        "Afvalwater of andere afvalstoffen, waarvan de lozing in een schoonwaterriool niet is vrijgesteld in het omgevingsplan, lozen in een schoonwaterriool",
        "Afvalwater, afkomstig van een calamiteitenoefening, lozen in het riool of op of in de bodem",
        "Afvalwater, afkomstig van een gemeentelijke voorziening voor inzameling en transport van afvalwater, lozen in het riool of op of in de bodem",
        "Afvalwater, afkomstig van het maken van betonmortel, lozen in het riool of op of in de bodem",
        "Afvalwater, afkomstig van het opslaan en overslaan van goederen, lozen in het riool of op of in de bodem",
        "Afvalwater, afkomstig van het schoonmaken van drinkwaterleidingen, lozen in het riool of op of in de bodem",
        "Afvalwater, afkomstig van het telen, kweken, spoelen of sorteren van gewassen, lozen in het riool of op of in de bodem",
        "Afvalwater, afkomstig van onderhoudswerkzaamheden aan bouwwerken, lozen in het riool of op of in de bodem",
      ].map((heading) => kaartMetItems(heading, [["", "in: gemeente Groningen"]])),
    },
  ];
}

export function plekinfoSecties(): AccordionSection[] {
  return [
    { handleTitle: "Gebiedsaanwijzingen (12)", heading: "h4", open: true, content: groepen(gebiedsaanwijzingen()) },
    { handleTitle: "Omgevingsnormen (15)", heading: "h4", open: true, content: groepen(omgevingsnormen()) },
    { handleTitle: "Activiteiten (95)", heading: "h4", open: true, content: groepen(activiteiten()) },
  ];
}

export function tabItems(): TabsItem[] {
  return [
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
}
