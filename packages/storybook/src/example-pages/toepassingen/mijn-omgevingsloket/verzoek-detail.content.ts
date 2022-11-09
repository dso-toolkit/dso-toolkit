import { DefinitionList } from "@dso-toolkit/sources";
import { html, TemplateResult } from "lit-html";

export const mainMenu = [
  {
    label: "Home",
    url: "#",
  },
  {
    label: "Vergunningscheck",
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
    label: "Mijn Omgevingsloket",
    url: "#",
    active: true,
  },
];

export const definitions: DefinitionList<TemplateResult> = {
  useSrOnlyColon: false,
  definitions: [
    {
      term: "Ingediend bij",
      descriptions: [
        {
          content: html`<strong>Gemeente Den Haag</strong>`,
        },
      ],
    },
    {
      term: "Behandeld door",
      descriptions: [
        {
          content: html`<strong>Omgevingsdienst Haaglanden</strong>`,
        },
      ],
    },
    {
      term: "Soort",
      descriptions: [
        {
          content: html`Aanvraag vergunning`,
        },
      ],
    },
    {
      term: "Locatie",
      descriptions: [
        {
          content: html`Laan van Eik en Duinen 125, 2564GX 's-Gravenhage`,
        },
      ],
    },
    {
      term: "Activiteit(en)",
      descriptions: [
        {
          content: html`Milieubelastende activiteit - vergunning`,
        },
        {
          content: html`Kappen van een boom - vergunning`,
        },
      ],
    },
    {
      term: "Doel",
      descriptions: [
        {
          content: html`Definitief`,
        },
      ],
    },
    {
      term: "Status",
      descriptions: [
        {
          content: html`Aangevuld`,
        },
      ],
    },
    {
      term: "Verzoek hulpnummer(s)",
      descriptions: [
        {
          content: html`20220101 00201 002 - 02-01-2022`,
        },
        {
          content: html`20220101 00201 002 - 02-01-2022`,
        },
        {
          content: html`20220101 00201 002 - 02-01-2022`,
        },
      ],
    },
  ],
};
