import { FormGroup } from "dso-toolkit";
import { TemplateResult } from "lit-html";

import { formGroupCheckboxesTemplate } from "./form-group-checkboxes.css-template";
import { formGroupConfirmTemplate } from "./form-group-confirm.css-template";
import { formGroupDatePickerTemplate } from "./form-group-date-picker.css-template";
import { formGroupFilesTemplate } from "./form-group-files.css-template";
import { formGroupInputTemplate } from "./form-group-input.css-template";
import { formGroupRadiosTemplate } from "./form-group-radios.css-template";
import { formGroupSearchBarTemplate } from "./form-group-search-bar.css-template";
import { formGroupSelectTemplate } from "./form-group-select.css-template";
import { formGroupStaticTemplate } from "./form-group-static.css-template";
import { formGroupTextareaTemplate } from "./form-group-textarea.css-template";

export function formGroupTemplate(formGroup: FormGroup<TemplateResult>) {
  switch (formGroup.group) {
    case "checkboxes":
      return formGroupCheckboxesTemplate(formGroup);
    case "confirm":
      return formGroupConfirmTemplate(formGroup);
    case "date-picker":
      return formGroupDatePickerTemplate(formGroup);
    case "files":
      return formGroupFilesTemplate(formGroup);
    case "input":
      return formGroupInputTemplate(formGroup);
    case "radios":
      return formGroupRadiosTemplate(formGroup);
    case "search-bar":
      return formGroupSearchBarTemplate(formGroup);
    case "select":
      return formGroupSelectTemplate(formGroup);
    case "static":
      return formGroupStaticTemplate(formGroup);
    case "textarea":
      return formGroupTextareaTemplate(formGroup);
    default:
      throw new Error("Unknown Form Group template");
  }
}
