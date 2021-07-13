import { Anchor } from '@dso-toolkit/sources';
import { html, nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

import { iconTemplate } from '../icon/icon.template';

function isIconOnly(iconMode: 'only' | 'after' | undefined, label: string) {
  return iconMode === 'only' ? nothing : label;
}

export function anchorTemplate({ icon, iconMode, label, modifier, url }: Anchor) {
  return html`
    <a
      href=${url}
      title=${ifDefined(iconMode === 'only' ? label : undefined)}
      class=${ifDefined(modifier)}
      target=${ifDefined(modifier?.includes('extern') ? '_blank' : undefined)}
      rel=${ifDefined(modifier?.includes('extern') ? 'noopener noreferrer' : undefined)}
    >${
      icon && iconMode !== 'only' && iconMode !== 'after'
        ? iconTemplate({ icon })
        : nothing
      }${
        modifier?.includes('btn')
          ? html`<span class=${ifDefined(iconMode === 'only' ? 'sr-only' : undefined)}>${label}</span>`
          : isIconOnly(iconMode, label)
      }${
        modifier?.includes('extern')
          ? html`<span class="sr-only">(Opent andere website in nieuw tabblad)</span>`
          : nothing
      }${
        icon && (iconMode === 'after' || iconMode === 'only')
          ? iconTemplate({ icon })
          : nothing
      }</a>
  `;
}
