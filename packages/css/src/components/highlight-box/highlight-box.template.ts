import { HighlightBox } from '@dso-toolkit/sources';
import { html, nothing, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';

export function highlightBoxTemplate({ yellow, white, dropShadow, border, step, icon, richContent }: HighlightBox<TemplateResult>) {
  return html`
    <div class="dso-highlight-box ${classMap({
      'dso-yellow': yellow,
      'dso-white': white,
      'dso-drop-shadow': dropShadow,
      'dso-border': border,
      'dso-has-counter': !!(step || icon)
    })}">
      ${step || icon
        ? html`
          <div class="dso-step-counter">
            ${step ?? html`
              <svg class="di di-${icon}">
                <use href="dso-icons.svg#${icon}" />
              </svg>
            `}
          </div>
        `
        : nothing
      }
      ${richContent}
    </div>
  `;
}
