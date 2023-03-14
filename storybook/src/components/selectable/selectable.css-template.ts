import { Selectable } from "dso-toolkit";
import { html, nothing, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
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
      dsoChange,
      info,
      slot,
    }) {
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
            @change=${(e: Event) => dsoChange?.(e)}
            ?disabled=${disabled}
            ?required=${required}
            ?checked=${checked}
          />
          ${indeterminate
            ? /* eslint-disable-next-line lit/quoted-expressions -- quotes are needed because id is passed as a string in javascript */ html`<script>
                document.getElementById("${id}").indeterminate = true;
              </script>`
            : /* eslint-disable-next-line lit/quoted-expressions -- quotes are needed because id is passed as a string in javascript */ html`<script>
                document.getElementById("${id}").indeterminate = false;
              </script>`}
          ${!labelledById ? html`<label for=${id}>${label}</label>` : html`<label></label>`}
          ${info
            ? html`
                ${!info.fixed ? infoButtonTemplate({ active: info.active }) : nothing}
                ${info.active || info.fixed ? infoTemplate({ ...info, id: info ? describedById : undefined }) : nothing}
              `
            : nothing}
        </div>
      `;
    },
};
