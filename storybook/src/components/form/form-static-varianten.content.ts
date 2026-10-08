import { html } from "lit-html";

import { FormGroupStaticVariant } from "../form-group/form-group-static.models.js";

import { FormGroupCollection } from "./form.models.js";

// Tijdelijk: testpagina om in #4022 de varianten van Form Group Static met een schermlezer te vergelijken.
const varianten: { variant: FormGroupStaticVariant; title: string }[] = [
  { variant: "huidig", title: "Huidig: label zonder veld (ter vergelijking)" },
  { variant: "term-details", title: "1. term en definition, spelling uit de ARIA-draft" },
  { variant: "term-labelledby", title: "2. term en definition, spelling uit ARIA 1.2" },
  { variant: "group", title: "3. role=group op de rij" },
  { variant: "fieldset", title: "4. fieldset met legend" },
  { variant: "dl", title: "5. dl per rij" },
  { variant: "span", title: "6. alleen een span" },
  { variant: "sr-only", title: "Afgevallen: labeltekst verborgen in de waarde" },
  { variant: "output", title: "Afgevallen: output" },
  { variant: "readonly", title: "Afgevallen: input readonly" },
];

const bevat = [
  "Bouwactiviteit (technisch) - Aanvraag vergunning (Rijk) 1",
  "Bouwactiviteit (technisch) - Aanvraag vergunning (Rijk) 2",
];

export function formGroupStaticVariantenContent(): FormGroupCollection[] {
  return varianten.map(({ variant, title }) => ({
    title,
    headingLevel: "h2",
    formGroups: [
      {
        group: "static",
        variant,
        id: `${variant}-verzoek`,
        label: "Verzoek 1:",
        value: "test nog een keer 1",
        edit: true,
      },
      {
        group: "static",
        variant,
        id: `${variant}-indienen-bij`,
        label: "Indienen bij:",
        value: "gemeente Apeldoorn",
      },
      {
        group: "static",
        variant,
        id: `${variant}-soort`,
        label: "Soort:",
        value: "Aanvraag vergunning",
      },
      {
        group: "static",
        variant,
        id: `${variant}-bevat`,
        label: "Bevat:",
        value: variant === "readonly" ? bevat.join(", ") : html`${bevat.map((regel) => html`<p>${regel}</p>`)}`,
      },
      {
        group: "input",
        type: "text",
        id: `${variant}-kenmerk`,
        label: "Uw kenmerk",
      },
    ],
  }));
}
