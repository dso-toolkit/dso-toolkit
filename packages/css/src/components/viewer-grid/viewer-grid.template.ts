import { ViewerGrid } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';
import { iconTemplate } from '../icon/icon.template';

export function viewerGridTemplate({ main, map, aside, panelSize, panelOpen, shrink, expand, closeAside }: ViewerGrid<TemplateResult>) {
  return html`
    <div class="dso-viewer-grid dso-viewer-grid-${panelSize}">
      <main class="dso-viewer-grid-main">
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
        <div class="dso-viewer-grid-inner">
          ${main}
        </div>
      </main>
      <div class="dso-viewer-grid-map">
        ${map}
      </div>
      <aside class="dso-viewer-grid-overlay" .hidden=${!panelOpen}>
        <div class="dso-viewer-grid-overlay-container">
          <div class="dso-viewer-grid-close-buttons">
            <button
              type="button"
              class="dso-viewer-grid-close"
              @click=${closeAside}
            >
              ${iconTemplate({ icon: 'times' })}
            </button>
          </div>
          <div class="dso-viewer-grid-inner">
            ${aside}
          </div>
        </div>
      </aside>
    </div>
  `;
}
