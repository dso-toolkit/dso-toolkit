import { FormGroupFiles } from "dso-toolkit";
import { TemplateResult, html, nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const cssFormGroupFiles: ComponentImplementation<FormGroupFiles<TemplateResult>> = {
  component: "formGroupFiles",
  implementation: "html-css",
  template: ({ infoButtonTemplate, infoTemplate, selectableTemplate, iconTemplate, buttonTemplate, alertTemplate }) =>
    function formGroupFilesTemplate(formGroup) {
      const errorTextId = `${formGroup.id}-error-text`;
      const infoTextId = `${formGroup.id}-info-text`;

      const ariaDescribedBy =
        [formGroup.info?.fixed ? infoTextId : undefined].filter((s) => !!s).join(" ") || undefined;

      const ariaErrorMessage = formGroup.errorText ? errorTextId : undefined;

      return html`
        <fieldset
          class="form-group dso-files ${classMap({
            "dso-required": !!formGroup.required,
            [`dso-${formGroup.state}`]: !!formGroup.state,
          })}"
        >
          <div class="dso-label-container">
            <label for=${formGroup.id} class="control-label"> ${formGroup.label} </label>
            ${formGroup.info?.fixed === false && formGroup.infoButton
              ? infoButtonTemplate(formGroup.infoButton)
              : nothing}
            ${formGroup.info?.active ? infoTemplate({ ...formGroup.info, id: infoTextId }) : nothing}
          </div>
          <div class="dso-field-container">
            ${formGroup.files.length > 0
              ? html`<ul class="dso-filelist">
                  ${formGroup.files.map(
                    (file, index) =>
                      html`<li>
                        <div class="dso-filename" id=${`${formGroup.id}-file-filename-${index}`}>${file.filename}</div>
                        ${file.uploading
                          ? html`<div class="dso-upload-loading">
                              <dso-icon icon="spinner"></dso-icon><span>Uploaden</span>
                            </div>`
                          : selectableTemplate({
                              id: `${formGroup.id}-file-confirm-${index}`,
                              value: "",
                              type: "checkbox",
                              label: "Vertrouwelijk",
                              describedById: `${formGroup.id}-file-filename-${index}`,
                              checked: file.confidential,
                            })}
                        ${file.confidential ? iconTemplate({ icon: "status-warning" }) : nothing}
                        ${buttonTemplate({
                          label: "download document",
                          variant: "tertiary",
                          modifier: "dso-download",
                          ariaDescribedby: `${formGroup.id}-file-filename-${index}`,
                        })}
                        ${buttonTemplate({
                          label: "Verwijder document",
                          variant: "tertiary",
                          modifier: "dso-remove",
                          ariaDescribedby: `${formGroup.id}-file-filename-${index}`,
                        })}
                      </li>`,
                  )}
                </ul>`
              : nothing}
            ${formGroup.files.some((file) => !!file.confidential)
              ? alertTemplate({ status: "warning", message: formGroup.warning })
              : nothing}
            <div class="dso-file-upload">
              <input
                type="file"
                aria-describedby=${ifDefined(ariaDescribedBy)}
                aria-errormessage=${ifDefined(ariaErrorMessage)}
                id=${formGroup.id}
                ?disabled=${formGroup.disabled}
              />
              <label class="dso-${formGroup.addFileButtonVariant}" for=${formGroup.id}>
                ${iconTemplate({ icon: "plus" })}
                <span>Document toevoegen</span>
              </label>
            </div>

            ${formGroup.errorText && formGroup.state === "invalid"
              ? html`<p class="dso-message" role="alert" id=${errorTextId}>${formGroup.errorText}</p>`
              : nothing}
          </div>
        </fieldset>
      `;
    },
};
