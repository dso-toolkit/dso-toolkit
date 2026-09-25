import { FormGroupFilesFile } from "./form-group-files.models.js";

export function files(): FormGroupFilesFile[] {
  return [
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
}
