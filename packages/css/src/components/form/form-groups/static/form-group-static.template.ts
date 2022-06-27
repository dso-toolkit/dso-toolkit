import { FormGroupStatic } from '@dso-toolkit/sources';
import { html, nothing, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import { infoButtonTemplate } from '../../../info-button/info-button.template';
import { infoTemplate } from '../../../info/info.template';
import { buttonTemplate } from '../../../button/button.template';

export function formGroupStaticTemplate(formGroup: FormGroupStatic<TemplateResult>): TemplateResult {
  const infoTextId = `${formGroup.id}-info-text`;

  const ariaDescribedBy = [
    formGroup.info?.fixed ? infoTextId : undefined
  ]
    .filter(s => !!s)
    .join(' ') || undefined;

  return html`
    <div class="form-group dso-static ${classMap({ 'has-edit': !!formGroup.edit })}">
      <div class="dso-label-container">
        <label for=${formGroup.id} class="control-label">
          ${formGroup.label}
        </label>
        ${formGroup.info?.fixed === false && formGroup.infoButton
          ? infoButtonTemplate(formGroup.infoButton)
          : nothing
        }
        ${formGroup.info?.active
          ? infoTemplate({ ...formGroup.info, id: infoTextId })
          : nothing
        }
      </div>
      <div
        class="dso-field-container"
        aria-describedby=${ifDefined(ariaDescribedBy)}>
        ${formGroup.value}

        ${formGroup.edit
          ? buttonTemplate({ type: 'button', modifier: 'dso-tertiary', variant: null, label: 'Edit', icon: { icon: 'pencil' }, iconMode: 'only' })
          : nothing
        }
      </div>
    </div>
  `;
}
