import { Selectable } from "dso-toolkit";
import { TemplateResult, html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { when } from "lit-html/directives/when.js";

import { ComponentImplementation } from "../../templates";

export const cssSelectable: ComponentImplementation<Selectable<TemplateResult>> = {
  component: "selectable",
  implementation: "html-css",
  template: ({ infoButtonTemplate, infoTemplate }) =>
    function selectableTemplate({
      type,
      id,
      name,
      label,
      value,
      required,
      invalid,
      describedById,
      labelledById,
      checked,
      indeterminate,
      disabled,
      options,
      dsoChange,
      info,
      slot,
    }): TemplateResult {
      const ariaDescribedBy =
        [describedById, info?.fixed ? info.id : undefined].filter((id) => !!id).join(" ") || undefined;

      return html`
        <div class="dso-selectable">
          <input
            type=${type}
            id=${id}
            value=${value}
            name=${ifDefined(name)}
            aria-invalid=${ifDefined(invalid)}
            aria-describedby=${ifDefined(ariaDescribedBy)}
            aria-labelledby=${ifDefined(labelledById)}
            slot=${ifDefined(slot)}
            @change=${(e: CustomEvent) => dsoChange?.(e.detail)}
            ?disabled=${disabled}
            ?required=${required}
            ?checked=${checked}
          />
          ${indeterminate
            ? html`<script>
                document.getElementById("${id}").indeterminate = true;
              </script>`
            : html`<script>
                document.getElementById("${id}").indeterminate = false;
              </script>`}
          ${!labelledById ? html`<label for=${id}>${label}</label>` : html`<label>${label}</label>`}
          ${info
            ? html`
                ${!info.fixed ? infoButtonTemplate({ active: info.active }) : nothing}
                ${info.active || info.fixed ? infoTemplate({ ...info, id: info ? describedById : undefined }) : nothing}
              `
            : nothing}
          ${when(
            options?.length,
            () =>
              html`<ul class="dso-selectable-options">
                ${options?.map((option) => html`<li>${selectableTemplate(option)}</li>`)}
              </ul>`,
          )}
        </div>
      `;
    },
};
