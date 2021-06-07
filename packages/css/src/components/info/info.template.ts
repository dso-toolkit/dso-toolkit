import { Info } from '@dso-toolkit/sources';
import { html, nothing, TemplateResult } from 'lit-html';

export function infoTemplate({ fixed, richContent, onClose }: Info<TemplateResult>) {
  return html`
    <div class="dso-info">
      ${fixed
        ? html`
          <button type="button" @click=${onClose}>
            <span class="sr-only">Sluiten</span>
          </button>
        `
        : nothing
      }
      ${richContent}
    </div>
  `;
}
