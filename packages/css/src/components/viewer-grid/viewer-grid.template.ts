import { ViewerGrid } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';
import { iconTemplate } from '../icon/icon.template';

export function viewerGridTemplate({ main, map, overlay, panelSize, panelOpen, shrink, expand, closeOverlay }: ViewerGrid<TemplateResult>) {
  return html`
    <div class="dso-viewer-grid dso-viewer-grid-${panelSize}">
      <div class="dso-viewer-grid-main">
        <div class="dso-viewer-grid-sizing-buttons">
          <button
            type="button"
            class="dso-viewer-grid-shrink"
            @click=${shrink}
            .disabled=${panelSize === 'small'}
          >
            ${iconTemplate({ icon: 'chevron-left' })}
          </button>
          <button
            type="button"
            class="dso-viewer-grid-expand"
            @click=${expand}
            .disabled=${panelSize === 'large'}
          >
            ${iconTemplate({ icon: 'chevron-right' })}
          </button>
        </div>
        ${main}
      </div>
      <div class="dso-viewer-grid-map">
        ${map}
      </div>
      <div class="dso-viewer-grid-overlay" .hidden=${!panelOpen}>
        <button
          type="button"
          class="dso-viewer-grid-overlay-close-button"
          @click=${closeOverlay}
        >
          ${iconTemplate({ icon: 'times' })}
        </button>
        ${overlay}
      </div>
    </div>
  `;
}
