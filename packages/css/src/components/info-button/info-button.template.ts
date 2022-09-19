import { InfoButton } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';

export function infoButtonTemplate({ active, label, secondary, onToggle }: InfoButton) {
  return html`
    <button
      type="button"
      class="dso-info-button ${classMap({
        'dso-open': !!active,
        'dso-info-secondary': !!secondary
      })}"
      aria-expanded=${ifDefined(active?.toString())}
      @click=${onToggle}
    >
      <span class="sr-only">
        ${label ?? 'Toelichting bij optie'}
      </span>
    </button>
  `;
}
