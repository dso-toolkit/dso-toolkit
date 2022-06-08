import { ViewerGrid } from "@dso-toolkit/sources";
import { html, TemplateResult } from "lit-html";
import { ifDefined } from 'lit-html/directives/if-defined.js';

export function viewerGridTemplate({
  filterpanel,
  main,
  map,
  overlay,
  noOverlay,
  filterpanelOpen,
  overlayOpen,
  initialMainSize,
  mainSizeChange,
  filterpanelApply,
  filterpanelCancel,
  closeOverlay,
}: ViewerGrid<TemplateResult>) {
  return noOverlay
    ? html`
        <dso-viewer-grid
          ?overlay-open=${overlayOpen}
          initial-main-size=${ifDefined(initialMainSize)}
          @closeOverlay=${closeOverlay}
        >
          <div slot="main">${main}</div>
          <div slot="map">${map}</div>
        </dso-viewer-grid>
      `
    : html`
        <dso-viewer-grid
          ?filterpanel-open=${filterpanelOpen}
          ?overlay-open=${overlayOpen}
          initial-main-size=${ifDefined(initialMainSize)}
          @mainSizeChange=${mainSizeChange}
          @closeOverlay=${closeOverlay}
          @filterpanelApply=${filterpanelApply}
          @filterpanelCancel=${filterpanelCancel}
        >
          <div slot="filterpanel">${filterpanel}</div>
          <div slot="main">${main}</div>
          <div slot="map">${map}</div>
          <div slot="overlay">${overlay}</div>
        </dso-viewer-grid>
      `;
}
