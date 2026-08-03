import { FormButtons } from "../form-buttons/form-buttons.models.js";
import { FormGroup } from "../form-group/form-group.models.js";

import { FormGroupCollection } from "./form.models.js";

const persoonlijkeGegevensFormGroups: FormGroup<never>[] = [
  {
    group: "input",
    id: "mijn-voornaam",
    type: "text",
    label: "Voornaam",
    required: true,
    errorText: "Dit is een verplicht veld",
  },
  {
    group: "input",
    id: "mijn-achternaam",
    type: "text",
    label: "Achternaam",
    helpText: "Mag ook de familienaam zijn",
  },
  {
    group: "static",
    id: "mijn-geslacht",
    label: "Geslacht",
    value: "Man",
  },
  {
    group: "date-picker",
    id: "mijn-geboortedatum",
    label: "Geboortedatum",
  },
  {
    group: "input",
    id: "mijn-email",
    type: "email",
    label: "E-mailadres",
    required: true,
    errorText: "Dit is een verplicht veld",
  },
  {
    group: "input",
    id: "mijn-wachtwoord",
    type: "password",
    label: "Wachtwoord",
  },
  {
    group: "input",
    id: "mijn-wachtwoord-bevestiging",
    type: "password",
    label: "Wachtwoord (bevestig)",
  },
  {
    group: "confirm",
    id: "mijn-nieuwsbrief",
    selectable: {
      type: "checkbox",
      id: "mijn-nieuwsbrief-select",
      label: "Stuur mij de maandelijkse nieuwsbrief",
      value: "nieuwsbrief",
    },
    helpText: "Uw gegevens zullen niet worden gedeeld met derden.",
  },
];

const overigeVragenFormGroups: FormGroup<never>[] = [
  {
    group: "files",
    id: "mijn-files",
    label: "Bijlagen",
    addFileButtonVariant: "secondary",
    errorText: "Voeg een document toe.",
    files: [
      {
        filename: "Schetsen_en_foto's_1.pdf",
      },
      {
        filename: "Bijlagen_hoveniersbedrijf_de_heggeschaar_hoveniers.jpg",
        confidential: true,
      },
    ],
    warning:
      "U vraagt of wij een document vertrouwelijk willen behandelen. Er zal worden beoordeeld of uw vraag terecht is. U krijgt hiervan bericht.",
  },
  {
    group: "select",
    id: "mijn-beleg",
    label: "Beleg",
    multiple: true,
    items: [
      {
        label: "Vlees",
        options: [
          {
            value: "worst",
            label: "Worst",
          },
          {
            value: "salami",
            label: "Salami",
          },
          {
            value: "geit",
            label: "Geit",
          },
        ],
      },
      {
        label: "Vis",
        options: [
          {
            value: "zalm",
            label: "Zalm",
          },
          {
            value: "makreel",
            label: "Makreel",
          },
        ],
      },
    ],
  },
  {
    group: "select",
    id: "mijn-auto",
    label: "Type auto",
    items: [
      {
        label: "Europees",
        options: [
          {
            value: "alfa",
            label: "Alfa Romeo",
          },
          {
            value: "fiat",
            label: "Fiat",
          },
          {
            value: "mercedes",
            label: "Mercedes",
            selected: true,
          },
          {
            value: "volkswagen",
            label: "Volkswagen",
          },
        ],
      },
      {
        label: "Amerikaans",
        options: [
          {
            value: "chevrolet",
            label: "Chevrolet",
          },
          {
            value: "ford",
            label: "Ford",
          },
          {
            value: "tesla",
            label: "Tesla",
          },
        ],
      },
    ],
  },
  {
    group: "search-bar",
    id: "mijn-zoekterm",
    label: "Type",
    searchBar: {
      placeholder: "Bv. GTI",
      icon: true,
      id: "mijn-zoekterm-search",
      hideSearchButton: true,
      clearButton: true,
      buttonLabel: "Zoeken",
    },
  },
  {
    group: "radios",
    id: "mijn-aanhanger",
    label: "Welke aanhanger",
    selectables: [
      {
        type: "radio",
        id: "mijn-aanhanger-1",
        value: "bak",
        label: "Bak",
      },
      {
        type: "radio",
        id: "mijn-aanhanger-2",
        value: "caravan",
        label: "Caravan",
        checked: true,
      },
      {
        type: "radio",
        id: "mijn-aanhanger-3",
        value: "fietsendrager",
        label: "Fietsendrager",
      },
      {
        type: "radio",
        id: "mijn-aanhanger-4",
        value: "oplegger",
        label: "Oplegger",
      },
    ],
  },
  {
    group: "checkboxes",
    id: "mijn-keuze",
    label: "Maak een keuze",
    selectables: [
      {
        type: "checkbox",
        id: "mijn-keuze-1",
        value: "1",
        label: "een",
      },
      {
        type: "checkbox",
        id: "mijn-keuze-2",
        value: "2",
        label: "twee",
      },
      {
        type: "checkbox",
        id: "mijn-keuze-3",
        value: "3",
        label: "drie",
      },
    ],
  },
  {
    group: "textarea",
    id: "mijn-opmerking",
    label: "Waarom heeft een tankstation dat 24 uur per dag open is een slot op de deur?",
    rows: 5,
    helpText: "Deze vraag heeft een toelichting",
    placeholder: "",
  },
  {
    group: "radios",
    id: "mijn-keuze-infobutton-dicht",
    label: "Soms laat de vraagstelling aan duidelijkheid te wensen over. Wenst u een toelichting hierop?",
    infoButton: {
      label: "Toelichting bij vraag",
      active: false,
    },
    info: {
      id: "input-radio-infobutton-vraag",
      content: "Toelichting bij vraag",
      fixed: false,
    },
    selectables: [
      {
        type: "radio",
        id: "mijn-keuze-1",
        value: "1",
        label: "ja, de vraagstelling aan duidelijkheid te wensen over, ik wil graag een toelichting hierop",
        checked: true,
        info: {
          id: "input-radio-infobutton-antwoord",
          content: "Toelichting bij antwoord",
        },
      },
      {
        type: "radio",
        id: "mijn-keuze-2",
        value: "2",
        label: "nee, het is mij duidelijk",
      },
    ],
  },
  {
    group: "radios",
    id: "mijn-keuze-infobutton-open",
    label: "Toelichting op uw vraag",
    infoButton: {
      label: "Toelichting",
      active: true,
    },
    info: {
      id: "input-radio-infobutton-open-vraag",
      content:
        "Bij verticale formulieren wordt het bij checkboxen en radio's onoverzichtelijk als de toelichting bij de vraag EN opties toont",
      active: true,
      fixed: false,
    },
    selectables: [
      {
        type: "radio",
        id: "mijn-keuze-infobutton-open-1",
        value: "1",
        label: "ja",
        checked: true,
        info: {
          id: "input-radio-infobutton-open-antwoord",
          content: "Toelichting op uw antwoord",
        },
      },
      {
        type: "radio",
        id: "mijn-keuze-2",
        value: "2",
        label: "nee",
      },
    ],
  },
  {
    group: "files",
    id: "mijn--no-files",
    label: "Overige documenten",
    addFileButtonVariant: "secondary",
    errorText: "Voeg een document toe.",
    files: [],
    warning: "",
  },
];

export const formGroupContent: FormGroup<never>[] = [...persoonlijkeGegevensFormGroups, ...overigeVragenFormGroups];

export const formGroupCollectionContent: FormGroupCollection<never>[] = [
  {
    title: "Persoonlijke gegevens",
    headingLevel: "h2",
    formGroups: [...persoonlijkeGegevensFormGroups],
  },
  {
    title: "Overige vragen",
    headingLevel: "h2",
    formGroups: [...overigeVragenFormGroups],
  },
];

export const buttons: FormButtons = {
  buttons: [
    {
      type: "button",
      variant: "tertiary",
      label: "Annuleren",
    },
    {
      type: "submit",
      variant: "primary",
      label: "Verstuur",
    },
  ],
};
