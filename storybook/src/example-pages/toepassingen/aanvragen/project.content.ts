import { TemplateResult } from "lit-html";

import type { Form } from "../../../components/form/form.models.js";

export const form: Form<TemplateResult> = {
  mode: "horizontal",
  content: [
    {
      group: "input",
      id: "naam project",
      type: "text",
      label: "Wat is de naam van uw project?",
    },
    {
      group: "textarea",
      id: "beschrijving project",
      label: "Korte omschrijving van uw project",
    },
    {
      group: "textarea",
      id: "kosten project",
      label: "Wat zijn de kosten van uw project?",
    },
  ],
};
