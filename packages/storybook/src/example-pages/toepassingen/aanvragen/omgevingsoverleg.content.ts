import { DefinitionList, FormGroupRadios } from "@dso-toolkit/sources";
import { html, TemplateResult } from "lit-html";

export const definitionList1: DefinitionList = {
  useSrOnlyColon: false,
  definitions: [
    {
      term: "Verzoek 1",
      descriptions: [
        {
          content: "Object Laan van Eik en Duinen 125, 's-Gravenhage 1",
        },
      ],
    },
    {
      term: "Indienen bij",
      descriptions: [
        {
          content: "Hoogheemraadschap van Delfland",
        },
      ],
    },
    {
      term: "Soort",
      descriptions: [
        {
          content: "Aanvraag vergunning",
        },
      ],
    },
    {
      term: "Bevat",
      descriptions: [
        {
          content: "Milieubelastende activiteit - Vergunning (Gemeente)",
        },
      ],
    },
    {
      term: "Omgevingsoverleg mogelijk",
      descriptions: [
        {
          content: "Nee",
        },
      ],
    },
  ],
};

export const definitionlist2: DefinitionList = {
  useSrOnlyColon: false,
  definitions: [
    {
      term: "Verzoek 2",
      descriptions: [
        {
          content: "Object Laan van Eik en Duinen 125, 's-Gravenhage 2",
        },
      ],
    },
    {
      term: "Indienen bij",
      descriptions: [
        {
          content: "Gemeente Den Haag",
        },
      ],
    },
    {
      term: "Soort",
      descriptions: [
        {
          content: "Melding",
        },
      ],
    },
    {
      term: "Bevat",
      descriptions: [
        {
          content: "Milieubelastende activiteit - Vergunning (Gemeente)",
        },
      ],
    },
    {
      term: "Omgevingsoverleg mogelijk",
      descriptions: [
        {
          content: "Ja",
        },
      ],
    },
  ],
};

export const radios: FormGroupRadios<TemplateResult> = {
  group: "radios",
  id: "omgevings-overleg-radio",
  label: "Wilt u uw verzoeken definitief of als Omgevingsoverleg indienen?",
  inline: true,
  info: {
    fixed: true,
    active: true,
    content: html`
      <div class="dso-rich-content">
        <p>
          Als u wilt, kunt u een aanvraag doen voor een Omgevingsoverleg. Het Omgevingsoverleg is een zorgvuldig proces
          waarin u uw plan bespreekt met uw gemeente, waterschap of provincie en andere betrokkenen. Samen kijkt u dan
          naar hoe haalbaar uw plan is, en hoe u uw plan het beste mogelijk kunt maken. Bij elk verzoek staat aangegeven
          of het mogelijk is om een Omgevingsoverleg in te dienen.
        </p>
        <p>
          Twijfelt u over uw plan, of heeft u een vraag? Neem dan contact op met uw gemeente, waterschap of provincie.
        </p>
        <p>
          Let op: kijk altijd eerst op de website van <em>Gemeente Den Haag</em> voor de mogelijke kosten van een
          Omgevingsoverleg.
        </p>
      </div>
    `,
  },
  selectables: [
    {
      id: "omgevings-overleg-radio-1",
      label: "Omgevingsoverleg",
      value: "Omgevingsoverleg",
      type: "radio",
    },
    {
      id: "omgevings-overleg-radio-2",
      label: "Definitief verzoek",
      value: "definitiefverzoek",
      type: "radio",
    },
  ],
};
