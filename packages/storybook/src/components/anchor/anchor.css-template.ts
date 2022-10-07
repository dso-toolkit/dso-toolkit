import { Anchor } from '@dso-toolkit/sources';
import { html, nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { ComponentImplementation } from '../../templates';

export const cssAnchor: ComponentImplementation<Anchor> = {
  component: 'anchor',
  implementation: 'css',
  template: ({ iconTemplate }) => function anchorTemplate({ icon, iconMode, label, modifier, url, ariaCurrent }: Anchor) {
    return html`<a
      href=${url}
      class=${ifDefined(modifier)}
      aria-current=${ifDefined(ariaCurrent)}
      target=${ifDefined(modifier?.includes('extern') ? '_blank' : undefined)}
      rel=${ifDefined(modifier?.includes('extern') ? 'noopener noreferrer' : undefined)}
    >${
      icon && iconMode !== 'after'
        ? iconTemplate(icon)
        : nothing
      }${label}${
        modifier?.includes('extern')
          ? html`<span class="sr-only">(Opent andere website in nieuw tabblad)</span>`
          : nothing
      }${
        icon && iconMode === 'after'
          ? iconTemplate(icon)
          : nothing
      }</a>`;
  }
}
