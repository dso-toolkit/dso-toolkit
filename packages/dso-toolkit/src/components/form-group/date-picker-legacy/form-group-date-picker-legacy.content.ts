import { FormGroupDatePickerLegacyArgs } from "./form-group-date-picker-legacy.args";

export const datePickerLegacyContent: Omit<FormGroupDatePickerLegacyArgs, "infoButtonHandler" | "infoCloseHandler"> = {
  id: "mijn-id",
  required: false,
  disabled: false,
  errorText: "Dit moet u verplicht aanvinken",
};
