import { StoryFnAngularReturnType } from "@storybook/angular/dist/client/types";

export function datePickerWithLabelTemplate(datePicker: StoryFnAngularReturnType, id: string, label: string) {
  return {
    template: `
      <label for="${id}">${label}</label>
      ${datePicker.template}
    `,
  };
}
