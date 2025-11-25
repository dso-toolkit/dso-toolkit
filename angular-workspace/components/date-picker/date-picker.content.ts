import type { IStory } from "@storybook/angular";

export function datePickerWithLabelTemplate(datePicker: IStory, id: string, label: string) {
  return {
    template: `
      <label for="${id}">${label}</label>
      ${datePicker.template}
    `,
  };
}
