import { Form } from '@dso-toolkit/sources';
import { html, nothing, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import { formGroupInputTemplate } from './form-groups/input/form-group-input.template';

export function formTemplate({ legend, mode, formGroups }: Form<TemplateResult>) {
  return html`
    <form class=${ifDefined(mode === 'horizontal' ? 'form-horizontal' : undefined)}>
      <fieldset>
        <legend>${legend}</legend>
        ${'_$litType$' in formGroups ? formGroups : formGroups.map(formGroup => {
          if (formGroup.group === 'input') {
            return formGroupInputTemplate(formGroup);
          }

          return nothing;
        })}
      </fieldset>
    </form>
  `;
}
