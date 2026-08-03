import { DsoSelectableCustomEvent } from "@dso-toolkit/core";
import { TemplateResult, html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { when } from "lit-html/directives/when.js";

import { Selectable, SelectableChangeEvent } from "./selectable.models.js";

export function selectableTemplate({
  type,
  id,
  name,
  label,
  value,
  required,
  invalid,
  describedById,
  errormessage,
  labelledById,
  checked,
  indeterminate,
  disabled,
  dsoChange,
  info,
  options,
  slot,
}: Selectable<TemplateResult>): TemplateResult {
  return html`
    <dso-selectable
      type=${type}
      identifier=${ifDefined(id || undefined)}
      value=${ifDefined(value)}
      name=${ifDefined(name)}
      described-by-id=${ifDefined(describedById)}
      errormessage=${ifDefined(errormessage)}
      labelled-by-id=${ifDefined(labelledById)}
      slot=${ifDefined(slot)}
      ?invalid=${invalid}
      ?disabled=${disabled}
      ?required=${required}
      ?checked=${checked}
      ?indeterminate=${indeterminate}
      ?info-fixed=${info?.fixed}
      @dsoChange=${(e: DsoSelectableCustomEvent<SelectableChangeEvent>) => dsoChange?.(e.detail)}
    >
      ${label} ${typeof info?.content === "string" ? unsafeHTML(info.content) : (info?.content ?? nothing)}
      ${when(
        options?.length,
        () =>
          html`<ul class="dso-selectable-options" slot="options">
            ${options?.map((option) => html`<li>${selectableTemplate(option)}</li>`)}
          </ul>`,
      )}
    </dso-selectable>
  `;
}
