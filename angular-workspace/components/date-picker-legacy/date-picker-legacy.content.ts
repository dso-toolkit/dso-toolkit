import { StoryFnAngularReturnType } from "@storybook/angular/dist/client/types";

export function datePickerLegacyWithLabelTemplate(
  datePickerLegacy: StoryFnAngularReturnType,
  id: string,
  label: string,
) {
  return {
    template: `
      <label for="${id}">${label}</label>
      ${datePickerLegacy.template}
    `,
  };
}

export function datePickerLegacyShowByScriptingTemplate(datePickerLegacy: StoryFnAngularReturnType, id: string) {
  return {
    template: `
      ${datePickerLegacy}

      <button
        type="button"
        (click)="${() =>
          Array.from(document.querySelectorAll("dso-date-picker-legacy"))
            .filter((e) => e.id === id)[0]
            ?.show()}"
      >
        Open
      </button>
    `,
  };
}
