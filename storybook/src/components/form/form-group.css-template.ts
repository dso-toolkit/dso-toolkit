import { FormGroup } from "dso-toolkit";
import { TemplateResult } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const cssFormGroup: ComponentImplementation<FormGroup<TemplateResult>> = {
  component: "formGroup",
  implementation: "html-css",
  template: ({
    formGroupCheckboxesTemplate,
    formGroupConfirmTemplate,
    formGroupFilesTemplate,
    formGroupInputTemplate,
    formGroupInputNumberTemplate,
    formGroupRadiosTemplate,
    formGroupSearchBarTemplate,
    formGroupSelectTemplate,
    formGroupStaticTemplate,
    formGroupTextareaTemplate,
  }) =>
    function formGroupTemplate(formGroup) {
      switch (formGroup.group) {
        case "checkboxes":
          return formGroupCheckboxesTemplate(formGroup);
        case "confirm":
          return formGroupConfirmTemplate(formGroup);
        case "files":
          return formGroupFilesTemplate(formGroup);
        case "input":
          return formGroupInputTemplate(formGroup);
        case "input-number":
          return formGroupInputNumberTemplate(formGroup);
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
    },
};
