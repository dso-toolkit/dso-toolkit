import { AngularTemplateResult } from "../angular-story-types";

export function datePickerWithLabelTemplate(
  datePicker: AngularTemplateResult,
  id: string,
  label: string,
): AngularTemplateResult {
  return {
    template: `
      <label for="${id}">${label}</label>
      ${datePicker.template}
    `,
  };
}
