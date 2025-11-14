import { AngularStoryReturn } from "../helpers";

export function datePickerWithLabelTemplate(
  datePicker: AngularStoryReturn,
  id: string,
  label: string,
): AngularStoryReturn {
  return {
    template: `
      <label for="${id}">${label}</label>
      ${datePicker.template}
    `,
  };
}
