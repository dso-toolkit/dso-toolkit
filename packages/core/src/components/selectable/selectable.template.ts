import { Selectable } from '@dso-toolkit/sources';
import { html, nothing, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

export function selectableTemplate({
  type,
  id,
  name,
  label,
  value,
  required,
  invalid,
  describedById,
  checked,
  disabled,
  onChange,
  info
}: Selectable<TemplateResult>) {
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
      ?info-fixed=${info}
      @dsoChange=${(e: CustomEvent<Event>) => onChange(e.detail)}
    >
      ${label}
      ${info ?? nothing}
    </dso-selectable>
  `;
}
