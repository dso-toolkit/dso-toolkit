import { FormGroupDatePickerArgs } from "../args/form-group-date-picker.args.js";

export const datePickerContent: Omit<FormGroupDatePickerArgs, "infoButtonHandler" | "infoCloseHandler"> = {
  id: "mijn-id",
  required: false,
  disabled: false,
  errorText: "Dit moet u verplicht aanvinken",
};
