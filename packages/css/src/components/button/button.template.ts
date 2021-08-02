import { Button, ButtonAnchor } from '@dso-toolkit/sources';
import { html, nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

import { iconTemplate } from '../icon/icon.template';

export function buttonTemplate(button: Button | ButtonAnchor) {
  return 'url' in button
    ? anchorElement(button)
    : buttonElement(button)
}

function anchorElement({
  url,
  label,
  modifier,
  id,
  icon,
  iconMode
}: ButtonAnchor) {
  return html`
    <a
      href=${url}
      class=${ifDefined(modifier)}
      ?id=${id}
    >
      ${icon && !iconMode
        ? iconTemplate(icon)
        : nothing
      }<span class=${ifDefined(iconMode === 'only' ? 'sr-only' : undefined)}>${label}</span>${modifier?.includes('extern')
        ? html`<span class="sr-only">(Opent andere website in nieuw tabblad)</span>`
        : nothing
      }${icon && iconMode
        ? iconTemplate(icon)
        : nothing
      }
    </a>
  `;
}

function buttonElement({
  variant,
  label,
  type,
  modifier,
  id,
  disabled,
  icon,
  iconMode,
  ariaDescribedby,
  ariaExpanded,
  ariaHaspopup,
  ariaRoledescription,
  onClick
}: Button) {
  type ??= 'button';
  const className = variant ? `dso-${variant}` : modifier;

  return html`
    <button
      type=${type}
      id=${ifDefined(id)}
      class=${ifDefined(className)}
      ?disabled=${disabled}
      aria-describedby=${ifDefined(ariaDescribedby)}
      aria-expanded=${ifDefined(ariaExpanded)}
      aria-haspopup=${ifDefined(ariaHaspopup ? 'menu' : undefined)}
      aria-roledescription=${ifDefined(ariaRoledescription)}
      @click=${ifDefined(onClick)}
    >
      ${
        icon && !iconMode
          ? iconTemplate(icon)
          : nothing
      }<span class=${ifDefined(iconMode === 'only' ? 'sr-only' : undefined)}>${label}</span>${
        icon && iconMode
          ? iconTemplate(icon)
          : nothing
      }
    </button>
  `;
}
