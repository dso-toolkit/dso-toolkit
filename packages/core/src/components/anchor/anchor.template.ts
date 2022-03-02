// Keep in sync with packages\css\src\components\anchor\anchor.template.ts (https://github.com/dso-toolkit/dso-toolkit/issues/1438)
import { Anchor } from '@dso-toolkit/sources';
import { html, nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

import { iconTemplate } from '../icon/icon.template';

export function anchorTemplate({ icon, iconMode, label, modifier, url }: Anchor) {
  return html`<a
    href=${url}
    class=${ifDefined(modifier)}
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