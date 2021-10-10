import { Description } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit-html/directives/if-defined';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

export function descriptionTemplate({ id, open, term, content, type }: Description) {
  return html`
    <a
      id="${id}-term"
      href="#${id}-content"
      class="${classMap({ [`dso-description-${type}`]: true, 'dso-open': open })}"
      aria-expanded="${ifDefined(open ? 'true' : 'false')}"
      aria-controls="${id}-content"
    >${unsafeHTML(term)}</a>
    <span id="${id}-content" class="dso-description-content">
      ${unsafeHTML(content)}
      <a href="#${id}-term">
        <span class="sr-only">Verbergen</span>
      </a>
    </span>
  `;
}
