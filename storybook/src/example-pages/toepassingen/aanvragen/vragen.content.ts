import { TemplateResult, html } from "lit-html";

import type { FormGroupCheckboxes } from "../../../components/form-group/form-group-checkboxes.models.js";
import type { FormGroupRadios } from "../../../components/form-group/form-group-radios.models.js";
import { richContentTemplate } from "../../../components/rich-content/rich-content.template.js";

export function radios(): FormGroupRadios<TemplateResult> {
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
