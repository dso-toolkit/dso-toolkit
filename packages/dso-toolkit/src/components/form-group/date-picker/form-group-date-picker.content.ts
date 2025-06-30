import { FormGroupDatePickerArgs } from "./form-group-date-picker.args";

export const datePickerContent: Omit<FormGroupDatePickerArgs, "infoButtonHandler" | "infoCloseHandler"> = {
  id: "mijn-id",
  label: "Datum",
  required: false,
  disabled: false,
  errorText: "Dit moet u verplicht aanvinken",
};
