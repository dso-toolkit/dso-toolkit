import { FormGroupBase } from "./form-group.base-model.js";

export interface FormGroupFiles<TemplateFnReturnType> extends FormGroupBase<TemplateFnReturnType> {
  group: "files";
  addFileButtonVariant: "primary" | "secondary";
  files: FormGroupFilesFile[];
  warning: string;
}

export interface FormGroupFilesFile {
  filename: string;
  confidential?: boolean;
  uploading?: boolean;
}
