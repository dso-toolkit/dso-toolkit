import { Features } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

import { Templates } from "../../templates";

export function featuresContent({ linkTemplate }: Templates): Features<TemplateResult>[] {
  return [
    {
      variant: undefined,
      content: {
        modifier: "dso-document-header-features",
        definitions: [
          {
            term: html`Opschrift:`,
            descriptions: [
              {
                content: "Nationaal Programma Landelijk Gebied",
              },
            ],
          },
          {
            term: html`Identificatie:`,
            descriptions: [
              {
                content: "/akn/nl/act/mnre1153/2023/NPLG",
              },
            ],
          },
          {
            term: html`Versie:`,
            descriptions: [
              {
                content: "/akn/nl/act/mnre1153/2023/NPLG/nld@2024-12-18;08105839",
              },
            ],
          },
        ],
      },
    },
    {
      variant: undefined,
      content: {
        modifier: "dso-document-header-features",
        definitions: [
          {
            term: html`Gepubliceerd:`,
            descriptions: [
              {
                content: html`26-10-2024 - Bekijk regeling op
                ${linkTemplate({
                  label: "overheid.nl",
                  url: "#",
                  icon: {
                    icon: "external-link",
                  },
                  iconMode: "after",
                })}`,
              },
            ],
          },
          {
            term: html`In werking:`,
            descriptions: [
              {
                content: "26-10-2024",
              },
            ],
          },
        ],
      },
    },
    {
      variant: "ontwerp",
      content: {
        modifier: "dso-document-header-features",
        definitions: [
          {
            term: html`Opschrift:`,
            descriptions: [
              {
                content: "Wijziging Werkingsgebieden Dijkversterking HWBP Buggenum",
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
          {
            term: html`Versie:`,
            descriptions: [
              {
                content: "/akn/nl/act/mnre1153/2023/NPLG/nld@2024-12-18;08105839",
              },
            ],
          },
        ],
      },
    },
    {
      variant: "ontwerp",
      content: {
        modifier: "dso-document-header-features",
        definitions: [
          {
            term: html`Gepubliceerd:`,
            descriptions: [
              {
                content: html`26-10-2024 - Bekijk regeling op
                ${linkTemplate({
                  label: "overheid.nl",
                  url: "#",
                  icon: {
                    icon: "external-link",
                  },
                  iconMode: "after",
                })}`,
              },
            ],
          },
          {
            term: html`Begin inzagetermijn:`,
            descriptions: [
              {
                content: "26-10-2024",
              },
            ],
          },
          {
            term: html`Einde inzagetermijn:`,
            descriptions: [
              {
                content: "06-12-2024",
              },
            ],
          },
        ],
      },
    },
    {
      variant: "besluitversie",
      content: {
        modifier: "dso-document-header-features",
        definitions: [
          {
            term: html`Opschrift:`,
            descriptions: [
              {
                content: "Realistatie winkelcentrum Veenendaal",
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
      },
    },
    {
      variant: "besluitversie",
      content: {
        modifier: "dso-document-header-features",
        definitions: [
          {
            term: html`Vaststelling:`,
            descriptions: [
              {
                content: "18-09-2024",
              },
            ],
          },
          {
            term: html`Bekendmaking:`,
            descriptions: [
              {
                content: html`02-10-2024 - Bekijk besluit op
                ${linkTemplate({
                  label: "overheid.nl",
                  url: "#",
                  icon: {
                    icon: "external-link",
                  },
                  iconMode: "after",
                })}`,
              },
            ],
          },
          {
            term: html`In werkingtreding:`,
            descriptions: [
              {
                content: "31-10-2024",
              },
            ],
          },
          {
            term: html`Einde beroepstermijn:`,
            descriptions: [
              {
                content: "14-11-2024",
              },
            ],
          },
          {
            term: html`Beroep ingesteld:`,
            descriptions: [
              {
                content: "ja",
              },
            ],
          },
          {
            term: html`Besluit geschorst:`,
            descriptions: [
              {
                content: html`11-12-2024 -
                ${linkTemplate({
                  label: "bekijk uitspraak",
                  url: "#",
                  icon: {
                    icon: "external-link",
                  },
                  iconMode: "after",
                })}`,
              },
            ],
          },
          {
            term: html`Schoring opgeheven:`,
            descriptions: [
              {
                content: "19-02-2025",
              },
            ],
          },
          {
            term: html`Uitspraak beroep:`,
            descriptions: [
              {
                content: html`10-09-2025 -
                ${linkTemplate({
                  label: "bekijk uitspraak",
                  url: "#",
                  icon: {
                    icon: "external-link",
                  },
                  iconMode: "after",
                })}`,
              },
            ],
          },
        ],
      },
    },
  ];
}
