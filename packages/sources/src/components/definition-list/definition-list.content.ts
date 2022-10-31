import { Definition } from "./definition-list.models";

export const definitions: Definition[] = [
  {
    term: "Thema",
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
    term: "Regelkwalificatie",
    descriptions: [
      {
        content: "Instructieregels",
      },
    ],
  },
  {
    term: "Onderwerp",
    descriptions: [
      {
        content: "Bedrijventerrein",
      },
    ],
  },
  {
    term: "Functie",
    descriptions: [
      {
        content: "Bedrijventerrein > Bedrijventerrein",
      },
    ],
  },
  {
    term: "Type regel",
    descriptions: [
      {
        content: "Bindend voor bestuursorganen",
      },
    ],
  },
  {
    term: "Normadressaat",
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
    term: "Pneumonoultramicroscopicsilicovolcanoconiosisfantasismus",
    descriptions: [
      {
        content:
          "<p>Een factitious (quasi-fictieve) vorm van pneumoconiose (stoflongen), veroorzaakt door het inademen van microscopisch kleine silicadeeltjes uit vulkanen.</p>",
      },
    ],
  },
  {
    term: "De stoflongziekte (mijnwerkers-pneumoconiose)",
    descriptions: [
      {
        content: "<p>Veroorzaakt door lange blootstelling aan kolengruis.</p>",
      },
    ],
  },
  {
    term: "Pneumoconiose",
    descriptions: [
      {
        content:
          "<p>Pneumoconiose of stoflong is een longaandoening die door de inhalatie van stof wordt veroorzaakt.</p>",
      },
    ],
  },
];

export const columnDefinitions: Definition[] = [
  {
    term: "Verzoek 1",
    descriptions: [
      {
        content: "Aanleg rondweg Leiden traject Rijnland route 1",
      },
    ],
  },
  {
    term: "Verzoeknummer",
    descriptions: [
      {
        content: "20181024 00729 000",
      },
    ],
  },
  {
    term: "Datum ingediend",
    descriptions: [
      {
        content: "24/10/2018",
      },
    ],
  },
  {
    term: "Ingediend bij",
    descriptions: [
      {
        content: "Gemeente Den Haag",
      },
    ],
  },
  {
    term: "Uw verzoek wordt behandeld door",
    descriptions: [
      {
        content: "Omgevingsdienst Haaglanden",
      },
    ],
  },
];

export const smallContentDefinitions: Definition[] = [
  {
    term: "Organisator",
    descriptions: [
      {
        content: "Gemeente Rotterdam",
      },
    ],
  },
  {
    term: "Verzoeknummer",
    descriptions: [
      {
        content: "12123497987",
      },
    ],
  },
  {
    term: "Status",
    descriptions: [
      {
        content: "Open",
      },
    ],
  },
  {
    term: "Creatiedatum",
    descriptions: [
      {
        content: "17-12-2019",
      },
    ],
  },
  {
    term: "Contactpersoon",
    descriptions: [
      {
        content: "Jan van Veen",
      },
    ],
  },
  {
    term: "Emailadres",
    descriptions: [
      {
        content: "j.veen@testmail.nl",
      },
    ],
  },
  {
    term: "Telefoonnummer",
    descriptions: [
      {
        content: "06-12345678",
      },
    ],
  },
];

export const listDefinitions: Definition[] = [
  {
    term: "Trefwoorden",
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
