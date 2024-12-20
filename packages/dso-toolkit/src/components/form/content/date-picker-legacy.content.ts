import { FormGroupDatePickerLegacyArgs } from "../args/form-group-date-picker-legacy.args.js";

export const DatePickerLegacyContent: Omit<FormGroupDatePickerLegacyArgs, "infoButtonHandler" | "infoCloseHandler"> = {
  id: "mijn-id",
  required: false,
  disabled: false,
  errorText: "Dit moet u verplicht aanvinken",
};
