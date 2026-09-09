import { TemplateResult } from "lit-html";

import { formGroupCheckboxesTemplate } from "./form-group-checkboxes.template.js";
import { formGroupConfirmTemplate } from "./form-group-confirm.template.js";
import { formGroupDatePickerTemplate } from "./form-group-date-picker.template.js";
import { formGroupFilesTemplate } from "./form-group-files.template.js";
import { formGroupInputTemplate } from "./form-group-input.template.js";
import { formGroupRadiosTemplate } from "./form-group-radios.template.js";
import { formGroupSearchBarTemplate } from "./form-group-search-bar.template.js";
import { formGroupSelectTemplate } from "./form-group-select.template.js";
import { formGroupStaticTemplate } from "./form-group-static.template.js";
import { formGroupTextareaTemplate } from "./form-group-textarea.template.js";
import { FormGroup } from "./form-group.models.js";

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
