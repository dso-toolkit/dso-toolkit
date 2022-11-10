import { html, TemplateResult } from "lit-html";
import { Definition } from "@dso-toolkit/sources";

export const definitions: Definition<TemplateResult>[] = [
  {
    term: html`Thema:`,
    descriptions: [
      {
        content: "Wonen",
      },
      {
        content: "Werken",
      },
    ],
  },
  {
    term: html`Regelkwalificatie:`,
    descriptions: [
      {
        content: "Instructieregels",
      },
    ],
  },
  {
    term: html`Onderwerp:`,
    descriptions: [
      {
        content: "Bedrijventerrein",
      },
    ],
  },
  {
    term: html`Functie:`,
    descriptions: [
      {
        content: "Bedrijventerrein > Bedrijventerrein",
      },
    ],
  },
  {
    term: html`Type regel:`,
    descriptions: [
      {
        content: "Bindend voor bestuursorganen",
      },
    ],
  },
  {
    term: html`Normadressaat:`,
    descriptions: [
      {
        content:
          "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>",
      },
      {
        content:
          "<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>",
      },
    ],
  },
  {
    term: html`Pneumonoultramicroscopicsilicovolcanoconiosisfantasismus:`,
    descriptions: [
      {
        content:
          "<p>Een factitious (quasi-fictieve) vorm van pneumoconiose (stoflongen), veroorzaakt door het inademen van microscopisch kleine silicadeeltjes uit vulkanen.</p>",
      },
    ],
  },
  {
    term: html`De stoflongziekte (mijnwerkers-pneumoconiose):`,
    descriptions: [
      {
        content: "<p>Veroorzaakt door lange blootstelling aan kolengruis.</p>",
      },
    ],
  },
  {
    term: html`Pneumoconiose:`,
    descriptions: [
      {
        content:
          "<p>Pneumoconiose of stoflong is een longaandoening die door de inhalatie van stof wordt veroorzaakt.</p>",
      },
    ],
  },
];

export const definitionsSrOnlyColon: Definition<TemplateResult>[] = [
  {
    term: html`Thema<span class="sr-only">:</span>`,
    descriptions: [
      {
        content: "Wonen",
      },
      {
        content: "Werken",
      },
    ],
  },
  {
    term: html`Regelkwalificatie<span class="sr-only">:</span>`,
    descriptions: [
      {
        content: "Instructieregels",
      },
    ],
  },
  {
    term: html`Onderwerp<span class="sr-only">:</span>`,
    descriptions: [
      {
        content: "Bedrijventerrein",
      },
    ],
  },
  {
    term: html`Functie<span class="sr-only">:</span>`,
    descriptions: [
      {
        content: "Bedrijventerrein > Bedrijventerrein",
      },
    ],
  },
  {
    term: html`Type regel<span class="sr-only">:</span>`,
    descriptions: [
      {
        content: "Bindend voor bestuursorganen",
      },
    ],
  },
  {
    term: html`Normadressaat<span class="sr-only">:</span>`,
    descriptions: [
      {
        content:
          "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>",
      },
      {
        content:
          "<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>",
      },
    ],
  },
  {
    term: html`Pneumonoultramicroscopicsilicovolcanoconiosisfantasismus<span class="sr-only">:</span>`,
    descriptions: [
      {
        content:
          "<p>Een factitious (quasi-fictieve) vorm van pneumoconiose (stoflongen), veroorzaakt door het inademen van microscopisch kleine silicadeeltjes uit vulkanen.</p>",
      },
    ],
  },
  {
    term: html`De stoflongziekte (mijnwerkers-pneumoconiose)<span class="sr-only">:</span>`,
    descriptions: [
      {
        content: "<p>Veroorzaakt door lange blootstelling aan kolengruis.</p>",
      },
    ],
  },
  {
    term: html`Pneumoconiose<span class="sr-only">:</span>`,
    descriptions: [
      {
        content:
          "<p>Pneumoconiose of stoflong is een longaandoening die door de inhalatie van stof wordt veroorzaakt.</p>",
      },
    ],
  },
];

export const columnDefinitions: Definition<TemplateResult>[] = [
  {
    term: html`Verzoek 1:`,
    descriptions: [
      {
        content: "Aanleg rondweg Leiden traject Rijnland route 1",
      },
    ],
  },
  {
    term: html`Verzoeknummer:`,
    descriptions: [
      {
        content: "20181024 00729 000",
      },
    ],
  },
  {
    term: html`Datum ingediend:`,
    descriptions: [
      {
        content: "24/10/2018",
      },
    ],
  },
  {
    term: html`Ingediend bij:`,
    descriptions: [
      {
        content: "Gemeente Den Haag",
      },
    ],
  },
  {
    term: html`Uw verzoek wordt behandeld door:`,
    descriptions: [
      {
        content: "Omgevingsdienst Haaglanden",
      },
    ],
  },
];

export const smallContentDefinitions: Definition<TemplateResult>[] = [
  {
    term: html`Organisator:`,
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
    term: html`Creatiedatum:`,
    descriptions: [
      {
        content: "17-12-2019",
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
];

export const listDefinitions: Definition<TemplateResult>[] = [
  {
    term: html`Trefwoorden:`,
    descriptions: [
      {
        list: {
          items: [
            { text: "aanbouwen" },
            { text: "afvalcontainer" },
            { text: "avegaarpaal" },
            { text: "berging" },
            { text: "bijbehorend bouwwerk" },
            { text: "bijkeuken" },
            { text: "blokhut" },
            { text: "boorpaal" },
            { text: "buispaal" },
            { text: "buitenkeuken" },
            { text: "carport" },
            { text: "dierenverblijf" },
            { text: "erker" },
            { text: "fietsenberging" },
            { text: "fietsenhok" },
            { text: "fundering" },
            { text: "garage" },
          ],
          modifier: "columns",
        },
      },
    ],
  },
];
