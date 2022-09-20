import { ListButton } from '@dso-toolkit/sources';

import { html, nothing } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { iconTemplate } from '../icon/icon.template';

import { inputNumberTemplate } from '../input-number/input-number.template';

function listButtonComponentTemplate({ count, disabled, hasInputNumber, label, sublabel, subcontent }: ListButton) {
  return html`
    <button type="button" class="dso-list-button ${classMap({ 'dso-selected': count > 0 })}" ?disabled=${disabled}>
      <span>${label}</span>
      ${sublabel ? html`<span class="dso-sublabel">${sublabel}</span>` : nothing}
      ${subcontent ? html`<span class="dso-subcontent">${unsafeHTML(subcontent)}</span>` : nothing}
      ${!hasInputNumber
        ? html`
            ${count === 1 ? html`${iconTemplate({ icon: 'check' })}` : nothing}
            ${count > 1 ? html`<span class="dso-count">${count}x</span>` : nothing}
          `
        : nothing
      }
      ${count > 0 ? html`<span class="sr-only">geselecteerd</span>` : nothing}
    </button>
  `;
}

export function listButtonTemplate(listButton: ListButton) {
  return html`
    ${listButton.hasInputNumber && listButton.inputNumber
      ? html`
        <div class="dso-btn-group">
          ${listButtonComponentTemplate(listButton)}
          ${inputNumberTemplate({ ...listButton.inputNumber, count: listButton.count })}
        </div>
        `
      : html`
        ${listButtonComponentTemplate(listButton)}
      `
    }
  `;
}
