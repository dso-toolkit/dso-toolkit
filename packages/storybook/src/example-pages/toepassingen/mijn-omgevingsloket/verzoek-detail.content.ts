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
  definitions: [
    {
      term: html`Ingediend bij:`,
      descriptions: [
        {
          content: html`<strong>Gemeente Den Haag</strong>`,
        },
      ],
    },
    {
      term: html`Behandeld door:`,
      descriptions: [
        {
          content: html`<strong>Omgevingsdienst Haaglanden</strong>`,
        },
      ],
    },
    {
      term: html`Soort:`,
      descriptions: [
        {
          content: html`Aanvraag vergunning`,
        },
      ],
    },
    {
      term: html`Locatie:`,
      descriptions: [
        {
          content: html`Laan van Eik en Duinen 125, 2564GX 's-Gravenhage`,
        },
      ],
    },
    {
      term: html`Activiteit(en):`,
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
      term: html`Doel:`,
      descriptions: [
        {
          content: html`Definitief`,
        },
      ],
    },
    {
      term: html`Status:`,
      descriptions: [
        {
          content: html`Aangevuld`,
        },
      ],
    },
    {
      term: html`Verzoek hulpnummer(s):`,
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
