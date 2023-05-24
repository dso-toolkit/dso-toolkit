import { DefinitionList, FormGroupRadios } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";

import { Templates } from "../../../templates";

export const definitionList1: DefinitionList<TemplateResult> = {
  definitions: [
    {
      term: html`Verzoek 1:`,
      descriptions: [
        {
          content: "Object Laan van Eik en Duinen 125, 's-Gravenhage 1",
        },
      ],
    },
    {
      term: html`Indienen bij:`,
      descriptions: [
        {
          content: "Hoogheemraadschap van Delfland",
        },
      ],
    },
    {
      term: html`Soort:`,
      descriptions: [
        {
          content: "Aanvraag vergunning",
        },
      ],
    },
    {
      term: html`Bevat:`,
      descriptions: [
        {
          content: "Milieubelastende activiteit - Vergunning (Gemeente)",
        },
      ],
    },
    {
      term: html`Omgevingsoverleg mogelijk:`,
      descriptions: [
        {
          content: "Nee",
        },
      ],
    },
  ],
};

export const definitionlist2: DefinitionList<TemplateResult> = {
  definitions: [
    {
      term: html`Verzoek 2:`,
      descriptions: [
        {
          content: "Object Laan van Eik en Duinen 125, 's-Gravenhage 2",
        },
      ],
    },
    {
      term: html`Indienen bij:`,
      descriptions: [
        {
          content: "Gemeente Den Haag",
        },
      ],
    },
    {
      term: html`Soort:`,
      descriptions: [
        {
          content: "Melding",
        },
      ],
    },
    {
      term: html`Bevat:`,
      descriptions: [
        {
          content: "Milieubelastende activiteit - Vergunning (Gemeente)",
        },
      ],
    },
    {
      term: html`Omgevingsoverleg mogelijk:`,
      descriptions: [
        {
          content: "Ja",
        },
      ],
    },
  ],
};

export function radios({ richContentTemplate }: Templates): FormGroupRadios<TemplateResult> {
  return {
    group: "radios",
    id: "omgevings-overleg-radio",
    label: "Wilt u uw verzoeken definitief of als Omgevingsoverleg indienen?",
    inline: true,
    info: {
      fixed: true,
      active: true,
      content: richContentTemplate({
        children: html`
          <p>
            Als u wilt, kunt u een aanvraag doen voor een Omgevingsoverleg. Het Omgevingsoverleg is een zorgvuldig
            proces waarin u uw plan bespreekt met uw gemeente, waterschap of provincie en andere betrokkenen. Samen
            kijkt u dan naar hoe haalbaar uw plan is, en hoe u uw plan het beste mogelijk kunt maken. Bij elk verzoek
            staat aangegeven of het mogelijk is om een Omgevingsoverleg in te dienen.
          </p>
          <p>
            Twijfelt u over uw plan, of heeft u een vraag? Neem dan contact op met uw gemeente, waterschap of provincie.
          </p>
          <p>
            Let op: kijk altijd eerst op de website van <em>Gemeente Den Haag</em> voor de mogelijke kosten van een
            Omgevingsoverleg.
          </p>
        `,
      }),
    },
    selectables: [
      {
        id: "omgevings-overleg-radio-1",
        label: "Omgevingsoverleg",
        value: "Omgevingsoverleg",
        type: "radio",
        info: {
          id: "omgevings-overleg-radio-1-info",
          content: html`<div slot="info">Dit is een omgevingsoverleg</div>`,
          fixed: false,
        },
      },
      {
        id: "omgevings-overleg-radio-2",
        label: "Definitief verzoek",
        value: "definitiefverzoek",
        type: "radio",
        info: {
          id: "omgevings-overleg-radio-2-info",
          content: html`<div slot="info">Dit is een definitief verzoek</div>`,
          fixed: false,
        },
      },
    ],
  };
}
