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
      term: html`Conceptverzoek mogelijk:`,
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
      term: html`Conceptverzoek mogelijk:`,
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
    id: "conceptverzoek-radio",
    label: "Wilt u uw verzoeken definitief of als conceptverzoek indienen?",
    inline: true,
    selectables: [
      {
        id: "conceptverzoek-radio-1",
        label: "Conceptverzoek",
        value: "conceptverzoek",
        type: "radio",
        info: {
          id: "conceptverzoek-radio-1-info",
          content: html`<div slot="info">Dit is een conceptverzoek</div>`,
          fixed: false,
        },
      },
      {
        id: "conceptverzoek-radio-2",
        label: "Definitief",
        value: "definitief",
        type: "radio",
        info: {
          id: "conceptverzoek-radio-2-info",
          content: html`<div slot="info">Dit is een definitief verzoek</div>`,
          fixed: false,
        },
      },
    ],
    info: {
      fixed: true,
      active: true,
      content: richContentTemplate({
        children: html`
          <p>
            U kunt uw aanvraag indienen als conceptverzoek. Met deze optie controleert de gemeente, waterschap of
            provincie of u de juiste informatie heeft ingevuld voordat u het verzoek definitief indient. Zo voorkomt u
            onnodige vertraging in de behandeling van het definitieve verzoek.
          </p>
          <p>Bij elk verzoek staat aangegeven of het mogelijk is een conceptverzoek in te dienen.</p>
          <p>
            Let op: kijk altijd eerst op de website van <em>Gemeente Den Haag</em> of er mogelijk kosten zijn voor het
            indienen van een conceptverzoek.
          </p>
        `,
      }),
    },
  };
}
