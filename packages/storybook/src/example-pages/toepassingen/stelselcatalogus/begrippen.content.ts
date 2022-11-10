import { Definition } from "@dso-toolkit/sources";
import { html, TemplateResult } from "lit-html";

export const mainMenu = [
  {
    label: "Home",
    url: "#",
  },
  {
    label: "Begrippen",
    url: "#",
    active: true,
  },
  {
    label: "Activiteiten",
    url: "#",
  },
  {
    label: "Werkzaamheden",
    url: "#",
  },
  {
    label: "Waardelijsten",
    url: "#",
  },
  {
    label: "Informatieproducten",
    url: "#",
  },
  {
    label: "Over de catalogus",
    url: "#",
  },
];

export const definitions1: Definition<TemplateResult>[] = [
  {
    term: html`
      Voorkeursterm<span class="sr-only">:</span>
      <dso-toggletip secondary="true">Dit is een toggletip met platte content.</dso-toggletip>
    `,
    descriptions: [
      {
        content: html`Aanlegplaats`,
      },
    ],
  },
  {
    term: html`
      Omschrijving<span class="sr-only">:</span>
      <dso-toggletip secondary="true">Dit is een toggletip met platte content.</dso-toggletip>
    `,
    descriptions: [
      {
        content: html`Een plek gelegen in een vaarweg, bedoeld voor aanmeren van schepen of vaartuigen, niet zijnde
        woonschepen, voor een bepaalde periode`,
      },
    ],
  },
  {
    term: html`
      Toelichting<span class="sr-only">:</span>
      <dso-toggletip secondary="true">Dit is een toggletip met platte content.</dso-toggletip>
    `,
    descriptions: [
      {
        content: html`Plek waar je voor een bepaalde tijd een vaartuig kan aanmeren`,
      },
    ],
  },
  {
    term: html` Valt binnen<span class="sr-only">:</span> `,
    descriptions: [
      {
        content: html` <a class="extern" src="#">Aquo begrippenkader</a>`,
      },
    ],
  },
];

export const definitions2: Definition<TemplateResult>[] = [
  {
    term: html`
      URI<span class="sr-only">:</span>
      <dso-toggletip secondary="true">Dit is een toggletip met platte content.</dso-toggletip>
    `,
    descriptions: [
      {
        content: html`<a class="extern" src="#"
          >https://water.omgevingswet.overheid.nl/aquobegrippenkader/id/concept/Aanlegplaats</a
        >`,
      },
    ],
  },
];

export const definitions3: Definition<TemplateResult>[] = [
  {
    term: html`
      Vergelijkbaar met<span class="sr-only">:</span>
      <dso-toggletip secondary="true">Dit is een toggletip met platte content.</dso-toggletip>
    `,
    descriptions: [
      {
        content: html`<a class="extern" src="#">Aanlegsteiger</a>`,
      },
    ],
  },
];

export const definitions4: Definition<TemplateResult>[] = [
  {
    term: html`
      Zie ook<span class="sr-only">:</span>
      <dso-toggletip secondary="true">Dit is een toggletip met platte content.</dso-toggletip>
    `,
    descriptions: [
      {
        content: html`<a class="extern" src="#">Steiger plaatsen</a>`,
      },
    ],
  },
];

export const definitions5: Definition<TemplateResult>[] = [
  {
    term: html`
      Bron<span class="sr-only">:</span>
      <dso-toggletip secondary="true">Dit is een toggletip met platte content.</dso-toggletip>
    `,
    descriptions: [
      {
        content: html`<a class="extern" src="#">Aquo</a>`,
      },
    ],
  },
  {
    term: html`
      Type<span class="sr-only">:</span>
      <dso-toggletip secondary="true">Dit is een toggletip met platte content.</dso-toggletip>
    `,
    descriptions: [
      {
        content: html`<a class="extern" src="#">https://www.w3.org/2004/02/skos/core#Concept</a>`,
      },
    ],
  },
  {
    term: html`
      Metadata<span class="sr-only">:</span>
      <dso-toggletip secondary="true">Dit is een toggletip met platte content.</dso-toggletip>
    `,
    descriptions: [
      {
        content: html`<a class="extern" src="#"
          >https://water.omgevingswet.overheid.nl/aquabegrippenkader/doc/20180412000000/concept/Aanlegplaats</a
        >`,
      },
    ],
  },
];
