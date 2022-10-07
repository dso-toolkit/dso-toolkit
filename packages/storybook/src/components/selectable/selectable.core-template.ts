import { Selectable } from '@dso-toolkit/sources';
import { html, nothing, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { ComponentImplementation } from '../../templates';

export const coreSelectable: ComponentImplementation<Selectable<TemplateResult>> = {
  component: 'seletable',
  implementation: 'core',
  template: () => function selectableTemplate({
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
        ?indeterminate=${indeterminate}
        ?info-fixed=${info?.fixed}
        @dsoChange=${(e: CustomEvent<Event>) => dsoChange?.(e.detail)}
      >
        ${label}
        ${info?.richContent ?? nothing}
      </dso-selectable>
    `;
  }
}
