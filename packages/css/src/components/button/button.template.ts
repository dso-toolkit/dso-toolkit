import { Button, ButtonAnonymous } from '@dso-toolkit/sources';
import { html, nothing } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit-html/directives/if-defined';

import { iconTemplate } from '../icon/icon.template';

export function buttonTemplate({ type,
  modifier,
  id,
  label,
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

  return html`
    <button
      type=${type}
      id=${ifDefined(id)}
      class=${ifDefined(modifier === ButtonAnonymous ? undefined : classMap({ 'btn': true, [`btn-${modifier}`]: !!modifier }))}
      ?disabled=${disabled}
      aria-describedby=${ifDefined(ariaDescribedby)}
      aria-expanded=${ifDefined(ariaExpanded)}
      aria-haspopup=${ifDefined(ariaHaspopup?.toString())}
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
