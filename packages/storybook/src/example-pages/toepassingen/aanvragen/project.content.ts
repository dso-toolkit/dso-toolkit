import { Form } from "@dso-toolkit/sources";
import { TemplateResult } from "lit-html";

export const form: Form<TemplateResult> = {
  mode: 'horizontal',
  legend: 'Project',
  formGroups: [
    {
      group: 'input',
      id: 'naam project',
      type: 'text',
      label: 'Wat is de naam van uw project?'
    },
    {
      group: 'textarea',
      id: 'beschrijving project',
      label: 'Korte omschrijving van uw project'
    },
    {
      group: 'textarea',
      id: 'kosten project',
      label: 'Wat zijn de kosten van uw project?'
    }
  ]
}
