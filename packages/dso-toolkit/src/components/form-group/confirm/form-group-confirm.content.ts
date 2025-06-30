import { FormGroupConfirmArgs } from "./form-group-confirm.args";

export const formGroupConfirmContent: Omit<FormGroupConfirmArgs, "infoButtonHandler" | "infoCloseHandler"> = {
  id: "mijn-id",
  required: false,
  disabled: false,
  errorText: "Dit moet u verplicht aanvinken",
  selectableLabel: "Ik ga akkoord met de voorwaarden",
  selectableValue: "Akkoord",
};
