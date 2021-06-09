import { Description } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit-html/directives/if-defined';

export function descriptionTemplate({ id, open, term, content }: Description) {
  return html`
    <a
      id="${id}-term"
      href="#${id}-content"
      class="dso-description-term ${classMap({ 'dso-open': open })}"
      aria-expanded="${ifDefined(open ? 'true' : 'false')}"
      aria-controls="${id}-content"
    >
      ${term}
    </a>
    <span id="${id}-content" class="dso-description-content">
      ${content}
      <a href="#${id}-term">
        <span class="sr-only">Verbergen</span>
      </a>
    </span>
  `;
}
