import { AutosuggestMarkItem, AutosuggestSuggestion, AutosuggestSuggestionGroup } from "./autosuggest.models.js";
import escapeStringRegexp from "escape-string-regexp";

const suggestionGroups: AutosuggestSuggestionGroup[] = [
  {
    groupLabel: "Eerste groep",
    suggestions: [
      { value: "Item 1 van de eerste groep" },
      { value: "Item 2 van de eerste groep" },
      { value: "Item 3 van de eerste groep" },
    ],
  },
  {
    groupLabel: "Tweede groep",
    suggestions: [
      { value: "Item 1 met een wat langere naam van de tweede groep", type: "Typering" },
      { value: "Item 2 met een wat langere naam van de tweede groep", type: "Typering" },
      { value: "Item 3 met een wat langere naam van de tweede groep", type: "Typering" },
      { value: "Item 4 met een wat langere naam van de tweede groep", type: "Typering" },
      { value: "Item 5 met een wat langere naam van de tweede groep", type: "Typering" },
      { value: "Item 6 met een wat langere naam van de tweede groep", type: "Typering" },
      { value: "Item 7 met een wat langere naam van de tweede groep", type: "Typering" },
      { value: "Item 8 met een wat langere naam van de tweede groep", type: "Typering" },
      { value: "Item 9 met een wat langere naam van de tweede groep", type: "Typering" },
    ],
  },
  {
    groupLabel: "Derde groep",
    suggestions: [
      {
        value: "Eenzaam item (met extra's)",
        type: "Typering",
        extras: ["Eerste extra", "Tweede extra", "Derde extra"],
      },
    ],
  },
  {
    groupLabel: "Vierde groep",
    suggestions: [{ value: "Slechts één item" }],
  },
  {
    groupLabel: "Activiteiten",
    suggestions: [
      {
        value: "Gelegenheid bieden tot zwemmen of baden",
        item: {
          naam: "Gelegenheid bieden tot zwemmen of baden",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2020/OW08x7717d4581b6d17xb2a3c9fc96f3",
              annotatieId: "nl.imow-mnre1034.activiteit.OW088c57cc32ac69958x3e87a881852b",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2020/OW07Ax7717d4581b6d17xb2a3c9fc96f",
              annotatieId: "nl.imow-mnre1034.activiteit.OW07A8c57cc32ac69958x3e87a881852",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2020/regOW01",
              annotatieId: "nl.imow-mnre1034.activiteit.GelegenheidZwemmen",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2021/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.GelegenheidZwemmen",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2020/OW01x7717d4581b6d17xb2a3c9fc96f3",
              annotatieId: "nl.imow-mnre1034.activiteit.OW018c57cc32ac69958x3e87a881852b",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2020/OW04x7717d4581b6d17xb2a3c9fc96f3",
              annotatieId: "nl.imow-mnre1034.activiteit.OW048c57cc32ac69958x3e87a881852b",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2020/OW10x7717d4581b6d17xb2a3c9fc96f3",
              annotatieId: "nl.imow-mnre1034.activiteit.OW108c57cc32ac69958x3e87a881852b",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW04146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW048c57cc32ac69958x3e87a881852b",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2020/OW03x7717d4581b6d17xb2a3c9fc96f3",
              annotatieId: "nl.imow-mnre1034.activiteit.OW038c57cc32ac69958x3e87a881852b",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW07146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW078c57cc32ac69958x3e87a881852b",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW03146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW038c57cc32ac69958x3e87a881852b",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2020/OW09x7717d4581b6d17xb2a3c9fc96f3",
              annotatieId: "nl.imow-mnre1034.activiteit.OW098c57cc32ac69958x3e87a881852b",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/OW01146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW018c57cc32ac69958x3e87a881852b",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW09146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW098c57cc32ac69958x3e87a881852b",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/OW02146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW028c57cc32ac69958x3e87a881852b",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2020/OW05x7717d4581b6d17xb2a3c9fc96f3",
              annotatieId: "nl.imow-mnre1034.activiteit.OW058c57cc32ac69958x3e87a881852b",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW05146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW058c57cc32ac69958x3e87a881852b",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW06146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW068c57cc32ac69958x3e87a881852b",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2020/OW06x7717d4581b6d17xb2a3c9fc96f3",
              annotatieId: "nl.imow-mnre1034.activiteit.OW068c57cc32ac69958x3e87a881852b",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2020/OW07x7717d4581b6d17xb2a3c9fc96f3",
              annotatieId: "nl.imow-mnre1034.activiteit.OW078c57cc32ac69958x3e87a881852b",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2020/OW02x7717d4581b6d17xb2a3c9fc96f3",
              annotatieId: "nl.imow-mnre1034.activiteit.OW028c57cc32ac69958x3e87a881852b",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW08146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW088c57cc32ac69958x3e87a881852b",
            },
          ],
        },
      },
      {
        value: "Gelegenheid bieden tot zwemmen of baden in een badwaterbassin",
        item: {
          naam: "Gelegenheid bieden tot zwemmen of baden in een badwaterbassin",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2021/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.ZwemBadBadwaterbassin",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW04146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW04xb559284d26a86ae756926454aba",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW07146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW07xb559284d26a86ae756926454aba",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW03146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW03xb559284d26a86ae756926454aba",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/OW01146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW01xb559284d26a86ae756926454aba",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW09146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW09xb559284d26a86ae756926454aba",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/OW02146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW02xb559284d26a86ae756926454aba",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW05146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW05xb559284d26a86ae756926454aba",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW06146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW06xb559284d26a86ae756926454aba",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW08146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW08xb559284d26a86ae756926454aba",
            },
          ],
        },
      },
      {
        value: "Gelegenheid bieden tot zwemmen of baden in een badwaterbassin voor eenmalig gebruik",
        item: {
          naam: "Gelegenheid bieden tot zwemmen of baden in een badwaterbassin voor eenmalig gebruik",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2021/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.ZwemBassinEenmalig",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW04146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW049x447d719e5a6d1ccb72cx9eff91",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW07146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW079x447d719e5a6d1ccb72cx9eff91",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW03146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW039x447d719e5a6d1ccb72cx9eff91",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/OW01146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW019x447d719e5a6d1ccb72cx9eff91",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW09146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW099x447d719e5a6d1ccb72cx9eff91",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/OW02146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW029x447d719e5a6d1ccb72cx9eff91",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW05146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW059x447d719e5a6d1ccb72cx9eff91",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW06146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW069x447d719e5a6d1ccb72cx9eff91",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW08146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW089x447d719e5a6d1ccb72cx9eff91",
            },
          ],
        },
      },
      {
        value: "Gelegenheid bieden tot zwemmen of baden in een badwaterbassin waarin het water wordt gedesinfecteerd",
        item: {
          naam: "Gelegenheid bieden tot zwemmen of baden in een badwaterbassin waarin het water wordt gedesinfecteerd",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2021/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.ZwemBassinDesinfect",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW04146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW04f18377x53fe4b9f1f546x26dbc5x",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW07146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW07f18377x53fe4b9f1f546x26dbc5x",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW03146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW03f18377x53fe4b9f1f546x26dbc5x",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/OW01146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW01f18377x53fe4b9f1f546x26dbc5x",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW09146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW09f18377x53fe4b9f1f546x26dbc5x",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/OW02146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW02f18377x53fe4b9f1f546x26dbc5x",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW05146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW05f18377x53fe4b9f1f546x26dbc5x",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW06146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW06f18377x53fe4b9f1f546x26dbc5x",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW08146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW08f18377x53fe4b9f1f546x26dbc5x",
            },
          ],
        },
      },
      {
        value: "Gelegenheid bieden tot zwemmen of baden in een zwemvijver",
        item: {
          naam: "Gelegenheid bieden tot zwemmen of baden in een zwemvijver",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2021/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.ZwemZwemvijver",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW04146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW041a489d7ae4xx9e94a44fd2d839a1",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW07146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW071a489d7ae4xx9e94a44fd2d839a1",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW03146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW031a489d7ae4xx9e94a44fd2d839a1",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/OW01146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW011a489d7ae4xx9e94a44fd2d839a1",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW09146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW091a489d7ae4xx9e94a44fd2d839a1",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/OW02146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW021a489d7ae4xx9e94a44fd2d839a1",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW05146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW051a489d7ae4xx9e94a44fd2d839a1",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW06146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW061a489d7ae4xx9e94a44fd2d839a1",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW08146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW081a489d7ae4xx9e94a44fd2d839a1",
            },
          ],
        },
      },
      {
        value: "Gelegenheid bieden tot zwemmen of baden in overige badwaterbassin",
        item: {
          naam: "Gelegenheid bieden tot zwemmen of baden in overige badwaterbassin",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2021/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.ZwemOverigBassin",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW04146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW04a34b37b6x755a6292c412fc7b68c",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW07146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW07a34b37b6x755a6292c412fc7b68c",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW03146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW03a34b37b6x755a6292c412fc7b68c",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/OW01146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW01a34b37b6x755a6292c412fc7b68c",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW09146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW09a34b37b6x755a6292c412fc7b68c",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/OW02146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW02a34b37b6x755a6292c412fc7b68c",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW05146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW05a34b37b6x755a6292c412fc7b68c",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW06146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW06a34b37b6x755a6292c412fc7b68c",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW08146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW08a34b37b6x755a6292c412fc7b68c",
            },
          ],
        },
      },
      {
        value: "Ongewoon voorval bij het bieden van gelegenheid tot zwemmen of baden in een badwaterbassin",
        item: {
          naam: "Ongewoon voorval bij het bieden van gelegenheid tot zwemmen of baden in een badwaterbassin",
          koppelingen: [
            {
              documentId: "/akn/nl/act/mnre1034/2021/BWBR0041330",
              annotatieId: "nl.imow-mnre1034.activiteit.OngVoorvalZwemBaden",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW04146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW047dxdbdf47183x3692c7cd876cf48",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW07146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW077dxdbdf47183x3692c7cd876cf48",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW03146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW037dxdbdf47183x3692c7cd876cf48",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/OW01146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW017dxdbdf47183x3692c7cd876cf48",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW09146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW097dxdbdf47183x3692c7cd876cf48",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2019/OW02146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW027dxdbdf47183x3692c7cd876cf48",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW05146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW057dxdbdf47183x3692c7cd876cf48",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW06146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW067dxdbdf47183x3692c7cd876cf48",
            },
            {
              documentId: "/akn/nl/act/mnre1034/2018/OW08146b7397b3f85255ca2exa3acc48",
              annotatieId: "nl.imow-mnre1034.activiteit.OW087dxdbdf47183x3692c7cd876cf48",
            },
          ],
        },
      },
    ],
  },
];

const suggestions: AutosuggestSuggestion[] = [
  {
    type: "adres in Amsterdam",
    value: "Amsteldijk 130A-H, 1078RT Amsterdam",
  },
  {
    value: "Rotterdamse Rijweg 15A, 3043BG Rotterdam",
  },
  {
    value: "Amsteldijk 152A-H, 1079LG Amsterdam",
  },
  {
    value: "Darwindreef 1, Utrecht",
  },
  {
    value: "Amstelkade 166A-H, 1078AX Amsterdam",
  },
  {
    type: "adres in Rotterdam",
    value: "Rotterdamse Rijweg 13A, 3043BG Rotterdam",
  },
  {
    type: "adres in Amsterdam",
    value: "Amstelkade 169A-H, 1078AZ Amsterdam",
  },
  {
    type: "adres in Utrecht",
    value: "Bantoedreef 1, Utrecht",
  },
  {
    type: "adres in Amsterdam",
    value: "Amstelveenseweg 170B-H, 1075XP Amsterdam",
  },
  {
    type: "adres in Utrecht",
    value: "Dichtersplein 1, Utrecht",
  },
  {
    type: "adres in Rotterdam",
    value: "Rotterdamse Rijweg 13B, 3043BG Rotterdam",
  },
  {
    type: "adres in Amsterdam",
    value: "Amstel 312A-H, 1017AP Amsterdam",
  },
  {
    value: "Amstel 312A-O, 1017AP Amsterdam",
  },
  {
    value: "Isotopenweg 1, Utrecht",
  },
  {
    type: "adres in Amsterdam",
    value: "Amstelbeststraat 6C-2, 1096GD Amsterdam",
  },
  {
    type: "adres in Amsterdam",
    value: "Amsteldijk 26A-1, 1074HT Amsterdam",
  },
  {
    type: "adres in Rotterdam",
    value: "Rotterdamse Rijweg 1A, 3043BE Rotterdam",
    item: 123,
  },
  {
    type: "adres in Rotterdam",
    value: "Rotterdamse Rijweg 1B, 3043BE Rotterdam",
  },
  {
    type: "adres in Utrecht",
    value: "Kanaaldijk 1, Utrecht",
  },
  {
    type: "adres in Rotterdam",
    value: "Rotterdamse Rijweg 7A, 3043BE Rotterdam",
  },
  {
    type: "adres in Rotterdam",
    value: "Rotterdamse Rijweg 9-BGA, 3043BE Rotterdam",
  },
  {
    type: "adres in Rotterdam",
    value: "Rotterdamse Rijweg 9-BGV, 3043BE Rotterdam",
  },
  {
    type: "adres in Rotterdam",
    value: "Rotterdamse Rijweg 15B, 3043BG Rotterdam",
  },
  {
    type: "adres in Utrecht",
    value: "Carmendreef 1, Utrecht",
  },
  {
    value: "Rotterdamse Rijweg 7B, 3043BE Rotterdam",
  },
  {
    type: "adres in Utrecht",
    value: "Catharijneplateau 1, Utrecht",
  },
  {
    type: "adres in Utrecht",
    value: "Chiosdreef 1, Utrecht",
  },
  {
    type: "adres in Utrecht",
    value: "Karpaten 1, Utrecht",
  },
  {
    value: "Amstelbeststraat 6C-1, 1096GD Amsterdam",
  },
  {
    value: "Kosdreef 1, Utrecht",
  },
  {
    value: "Slopen (zonder vragen)",
  },
  {
    value: "Slopen (zonder sttr bestand)",
  },
  {
    extras: ["In werking vanaf 01-01-2024", "gemeente Groningen", "/akn/nl/act/gm0014/2020/omgevingsplan"],
    type: "omgevingsplan (omgevingswet)",
    value: "Omgevingsplan gemeente Groningen",
  },
  {
    extras: ["Ontwerp 18-01-2024", "gemeente Groningen", "/akn/nl/act/gm0014/2020/omgevingsplan"],
    type: "omgevingsplan (omgevingswet)",
    value: "Omgevingsplan gemeente Groningen",
  },
  {
    extras: ["Ontwerp 16-06-2023 - in voorbereiding", "gemeente Groningen", "NL.IMRO.0202.OGV888-0201"],
    type: "omgevingsplan (omgevingswet)",
    value: "Omgevingsvergunning Friesestraatweg 141-36",
  },
  {
    extras: ["onherroepelijk 08-05-1962", "gemeente Berkelland", "NL.IMRO.18590000BGBCL19620508-"],
    type: "Gemeentelijk plan; Bestemmingsplan artikel 10",
    value: "Uitbreidingsplan in Hoofdzaken van de gemeente Borculo",
  },
  {
    value: "1e suggestie van 20",
  },
  {
    value: "2e suggestie van 20",
  },
  {
    value: "3e suggestie van 20",
  },
  {
    value: "4e suggestie van 20",
  },
  {
    value: "5e suggestie van 20",
  },
  {
    value: "6e suggestie van 20",
  },
  {
    value: "7e suggestie van 20",
  },
  {
    value: "8e suggestie van 20",
  },
  {
    value: "9e suggestie van 20",
  },
  {
    value: "10e suggestie van 20",
  },
  {
    value: "11e suggestie van 20",
  },
  {
    value: "12e suggestie van 20",
  },
  {
    value: "13e suggestie van 20",
  },
  {
    value: "14e suggestie van 20",
  },
  {
    value: "15e suggestie van 20",
  },
  {
    value: "16e suggestie van 20",
  },
  {
    value: "17e suggestie van 20",
  },
  {
    value: "18e suggestie van 20",
  },
  {
    value: "19e suggestie van 20",
  },
  {
    value: "20e suggestie van 20",
  },
];

export function fetchSuggestions(value: string): AutosuggestSuggestion[] {
  const terms = value.match(/(\S+)/g);

  return terms
    ? suggestions.filter((suggestion) =>
        terms.every((term) => new RegExp(escapeStringRegexp(term), "i").test(suggestion.value)),
      )
    : [];
}

export function fetchSuggestionGroups(value: string): AutosuggestSuggestionGroup[] {
  const suggestionGroupsDeepCopy: AutosuggestSuggestionGroup[] = JSON.parse(JSON.stringify(suggestionGroups));

  const terms = value.match(/(\S+)/g);

  return terms
    ? suggestionGroupsDeepCopy.filter((suggestionGroup) => {
        const filteredSuggestions = suggestionGroup.suggestions.filter((suggestion) =>
          terms.every((term) => new RegExp(escapeStringRegexp(term), "i").test(suggestion.value)),
        );

        suggestionGroup.suggestions = filteredSuggestions;

        return filteredSuggestions.length > 0;
      })
    : [];
}

export function mark(
  _suggestion: AutosuggestSuggestion,
  _text: string,
  type: "value" | "type" | "extra",
  extraIndex?: number,
): AutosuggestMarkItem[] {
  const extras: AutosuggestMarkItem[][] = [
    ["Ontwerp ", { mark: "18-" }, "01-2024"],
    ["gemeente Gron", { mark: "ing" }, "en"],
    ["/akn/nl/act/gm0014/2020/", { mark: "omg" }, "evingsplan"],
  ];

  let result: AutosuggestMarkItem[] = [""];

  switch (type) {
    case "value":
      result = [{ mark: "Omg" }, "evingsplan gemeente Groningen"];
      break;
    case "type":
      result = [{ mark: "omg" }, "evingsplan (", { mark: "omg" }, "evingswet)"];
      break;
    case "extra":
      if (extraIndex !== undefined && extraIndex >= 0 && extraIndex <= extras.length) {
        result = extras[extraIndex]!;
      }
  }

  return result;
}
