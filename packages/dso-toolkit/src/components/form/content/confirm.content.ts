import { FormGroupConfirmArgs } from "../args/form-group-confirm.args.js";

export const confirmContent: Omit<FormGroupConfirmArgs, "infoButtonHandler" | "infoCloseHandler"> = {
  id: "mijn-id",
  required: false,
  disabled: false,
  errorText: "Dit moet u verplicht aanvinken",
  selectableLabel: "Ik ga akkoord met de voorwaarden",
  selectableValue: "Akkoord",
};
