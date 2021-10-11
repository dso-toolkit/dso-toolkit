import { InfoButton } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit-html/directives/if-defined';

export function infoButtonTemplate({ active, label, onClick }: InfoButton) {
  return html`
    <button
      type="button"
      class="btn dso-info-button ${classMap({ 'dso-open': !!active })}"
      aria-expanded=${ifDefined(active?.toString())}
      @click=${onClick}
    >
      <span class="sr-only">
        ${label ?? 'Toelichting bij optie'}
      </span>
    </button>
  `;
}
