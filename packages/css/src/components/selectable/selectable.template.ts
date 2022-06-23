import { Selectable } from '@dso-toolkit/sources';
import { html, nothing, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import { infoButtonTemplate } from '../info-button/info-button.template';
import { infoTemplate } from '../info/info.template';

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
  indeterminate,
  disabled,
  onChange,
  info
}: Selectable<TemplateResult>) {
  return html`
    <div class="dso-selectable">
      <input
        type=${type}
        id=${id}
        value=${value}
        name=${ifDefined(name)}
        aria-invalid=${ifDefined(invalid)}
        aria-describedby=${ifDefined(info ? describedById : undefined)}
        @change=${(e: Event) => onChange?.(e)}
        ?disabled=${disabled}
        ?required=${required}
        ?checked=${checked}
      >
      ${indeterminate
        ? html`<script>document.getElementById('${id}').indeterminate = true;</script>`
        : html`<script>document.getElementById('${id}').indeterminate = false;</script>`
      }
      <label for=${id}>
        ${label}
      </label>
      ${info
        ? html`
          ${!info.fixed ? infoButtonTemplate({ active: info.active, onClick: info.onClose }) : nothing}
          ${info.active || info.fixed
            ? infoTemplate({ ...info, id: info ? describedById : undefined })
            : nothing
          }
        `
        : nothing
      }
    </div>
  `;
}
