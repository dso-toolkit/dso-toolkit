import { StoryFnAngularReturnType } from "@storybook/angular/dist/client/types";

export function datePickerWithLabelTemplate(datePicker: StoryFnAngularReturnType, id: string, label: string) {
  return {
    template: `
      <label for="${id}">${label}</label>
      ${datePicker.template}
    `,
  };
}

export function datePickerShowByScriptingTemplate(datePicker: StoryFnAngularReturnType, id: string) {
  return {
    template: `
      ${datePicker}

      <button
        type="button"
        (click)="${() =>
          Array.from(document.querySelectorAll("dso-date-picker"))
            .filter((e) => e.id === id)[0]
            ?.show()}"
      >
        Open
      </button>
    `,
  };
}
