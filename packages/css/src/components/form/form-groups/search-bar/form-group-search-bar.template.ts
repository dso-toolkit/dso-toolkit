import { FormGroupSearchBar } from '@dso-toolkit/sources';

import { html, nothing, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';

import { infoButtonTemplate } from '../../../info-button/info-button.template';
import { infoTemplate } from '../../../info/info.template';
import { searchBarTemplate } from '../../../search-bar/search-bar.template';

export function formGroupSearchBarTemplate(formGroup: FormGroupSearchBar<TemplateResult>): TemplateResult {
  const errorTextId = `${formGroup.id}-error-text`;
  const helpTextId = `${formGroup.id}-help-text`;
  const infoTextId = `${formGroup.id}-info-text`;

  const ariaDescribedBy = [
    formGroup.helpText ? helpTextId : undefined,
    formGroup.info?.fixed ? infoTextId : undefined
  ]
    .filter(s => !!s)
    .join(' ') || undefined;

  const ariaErrorMessage = formGroup.errorText ? errorTextId : undefined;

  return html`
    <div class="form-group dso-form-group-search-bar ${classMap({ [`dso-${formGroup.state}`]: !!formGroup.state })}">
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
      <div class="dso-field-container">
        ${searchBarTemplate({ ...formGroup.searchBar, invalid: formGroup.state === 'invalid', ariaDescribedBy: ariaDescribedBy, ariaErrorMessage: ariaErrorMessage })}
        ${formGroup.errorText && formGroup.state === 'invalid'
          ? html`
            <p class="dso-message" id=${errorTextId}>${formGroup.errorText}</p>
          `
          : nothing
        }
        ${formGroup.helpText
          ? html`
            <p class="dso-help-block" id=${helpTextId}>${formGroup.helpText}</p>
          `
          : nothing
        }
      </div>
    </div>
  `;
}
