import { Definition } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

import { Templates } from "../../../templates";

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

export function definitions1({ linkTemplate, toggletipTemplate }: Templates): Definition<TemplateResult>[] {
  return [
    {
      term: html`
        Voorkeursterm<span class="sr-only">:</span>
        ${toggletipTemplate({ secondary: true, children: html`Dit is een toggletip met platte content.` })}
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
        ${toggletipTemplate({ secondary: true, children: html`Dit is een toggletip met platte content.` })}
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
        ${toggletipTemplate({ secondary: true, children: html`Dit is een toggletip met platte content.` })}
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
          content: linkTemplate({ label: "Aquo begrippenkader", url: "#", mode: "extern" }),
        },
      ],
    },
  ];
}

export function definitions2({ toggletipTemplate, linkTemplate }: Templates): Definition<TemplateResult>[] {
  return [
    {
      term: html`
        URI<span class="sr-only">:</span>
        ${toggletipTemplate({ secondary: true, children: html`Dit is een toggletip met platte content.` })}
      `,
      descriptions: [
        {
          content: linkTemplate({
            label: "https://water.omgevingswet.overheid.nl/aquobegrippenkader/id/concept/Aanlegplaats",
            url: "#",
            mode: "extern",
          }),
        },
      ],
    },
  ];
}

export function definitions3({ toggletipTemplate, linkTemplate }: Templates): Definition<TemplateResult>[] {
  return [
    {
      term: html`
        Vergelijkbaar met<span class="sr-only">:</span>
        ${toggletipTemplate({ secondary: true, children: html`Dit is een toggletip met platte content.` })}
      `,
      descriptions: [
        {
          content: linkTemplate({ label: "Aanlegsteiger", url: "#", mode: "extern" }),
        },
      ],
    },
  ];
}

export function definitions4({ toggletipTemplate, linkTemplate }: Templates): Definition<TemplateResult>[] {
  return [
    {
      term: html`
        Zie ook<span class="sr-only">:</span>
        ${toggletipTemplate({ secondary: true, children: html`Dit is een toggletip met platte content.` })}
      `,
      descriptions: [
        {
          content: linkTemplate({ label: "Steiger plaatsen", url: "#", mode: "extern" }),
        },
      ],
    },
  ];
}

export function definitions5({ toggletipTemplate, linkTemplate }: Templates): Definition<TemplateResult>[] {
  return [
    {
      term: html`
        Bron<span class="sr-only">:</span>
        ${toggletipTemplate({ secondary: true, children: html`Dit is een toggletip met platte content.` })}
      `,
      descriptions: [
        {
          content: linkTemplate({ label: "Aquo", url: "#", mode: "extern" }),
        },
      ],
    },
    {
      term: html`
        Type<span class="sr-only">:</span>
        ${toggletipTemplate({ secondary: true, children: html`Dit is een toggletip met platte content.` })}
      `,
      descriptions: [
        {
          content: linkTemplate({
            label: "https://www.w3.org/2004/02/skos/core#Concept",
            url: "#",
            mode: "extern",
          }),
        },
      ],
    },
    {
      term: html`
        Metadata<span class="sr-only">:</span>
        ${toggletipTemplate({ secondary: true, children: html`Dit is een toggletip met platte content.` })}
      `,
      descriptions: [
        {
          content: linkTemplate({
            label: "https://water.omgevingswet.overheid.nl/aquabegrippenkader/doc/20180412000000/concept/Aanlegplaats",
            url: "#",
            mode: "extern",
          }),
        },
      ],
    },
  ];
}
