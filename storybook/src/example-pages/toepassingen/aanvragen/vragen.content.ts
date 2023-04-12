import { FormGroupCheckboxes, FormGroupRadios } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";

import { Templates } from "../../../templates";

export function radios({ richContentTemplate }: Templates): FormGroupRadios<TemplateResult> {
  return {
    group: "radios",
    id: "radios",
    label: "Test Vraag 1",
    inline: true,
    info: {
      fixed: true,
      active: true,
      content: richContentTemplate({
        children: html` <p>Vaste toelichting bij een vraag.</p> `,
      }),
    },
    selectables: [
      {
        id: "antwoord-radio-1",
        label: "Antwoord 1",
        value: "Antwoord 1",
        type: "radio",
      },
      {
        id: "antwoord-radio-2",
        label: "Antwoord 2",
        value: "Antwoord 2",
        type: "radio",
      },
    ],
  };
}

export const checkboxes: FormGroupCheckboxes<TemplateResult> = {
  group: "checkboxes",
  id: "checkboxes",
  label: "Test Vraag 2",
  selectables: [
    {
      id: "antwoord-checkbox-1",
      label: "Antwoord 1",
      value: "Antwoord 1",
      type: "checkbox",
    },
    {
      id: "antwoord-checkbox-2",
      label: "Antwoord 2",
      value: "Antwoord 2",
      type: "checkbox",
    },
  ],
};
