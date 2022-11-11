import { Selectable } from "@dso-toolkit/sources";
import { html, nothing, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { ComponentImplementation } from "../../templates";

export const coreSelectable: ComponentImplementation<Selectable<TemplateResult>> = {
  component: "selectable",
  implementation: "core",
  template: () =>
    function selectableTemplate({
      type,
      id,
      name,
      label,
      value,
      required,
      invalid,
      describedById,
      checked,
      indeterminate,
      disabled,
      dsoChange,
      info,
    }) {
      return html`
        <dso-selectable
          type=${type}
          identifier=${ifDefined(id || undefined)}
          value=${value}
          name=${ifDefined(name)}
          described-by-id=${ifDefined(describedById)}
          ?invalid=${invalid}
          ?disabled=${disabled}
          ?required=${required}
          ?checked=${checked}
          ?indeterminate=${indeterminate}
          ?info-fixed=${info?.fixed}
          @dsoChange=${(e: CustomEvent<Event>) => dsoChange?.(e.detail)}
        >
          ${label} ${typeof info?.content === "string" ? unsafeHTML(info.content) : info?.content ?? nothing}
        </dso-selectable>
      `;
    },
};
