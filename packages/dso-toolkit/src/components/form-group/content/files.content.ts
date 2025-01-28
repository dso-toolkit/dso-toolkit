import { FormGroupFilesArgs } from "../args/form-group-files.args.js";
import { FormGroupFilesFile } from "../models/form-group-files.model.js";

export const filesContent: Omit<FormGroupFilesArgs, "infoButtonHandler" | "infoCloseHandler"> = {
  id: "mijn-id",
  label: "Files",
  required: false,
  disabled: false,
  errorText: "Voeg een document toe.",
  warning:
    "U vraagt of wij een document vertrouwelijk willen behandelen. Er zal worden beoordeeld of uw vraag terecht is. U krijgt hiervan bericht.",
  addFileButtonVariant: "primary",
};

export const files: FormGroupFilesFile[] = [
  {
    filename: "Waterplan.pdf",
  },
  {
    filename: "Erfgrens dispuut.docx",
    confidential: true,
  },
  {
    filename: "Havenlayout.png",
  },
  {
    filename: "legger-2022-06-20-v3.zip",
    uploading: true,
  },
];
