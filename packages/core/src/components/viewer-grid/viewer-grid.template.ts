import { ViewerGrid } from "@dso-toolkit/sources";
import { html, nothing, TemplateResult } from "lit-html";
import { ifDefined } from 'lit-html/directives/if-defined.js';

export function viewerGridTemplate({
  filterpanel,
  main,
  map,
  overlay,
  filterpanelOpen,
  overlayOpen,
  initialMainSize,
  dsoMainSizeChange,
  dsoFilterpanelApply,
  dsoFilterpanelCancel,
  dsoCloseOverlay,
}: ViewerGrid<TemplateResult>) {
  return html`
    <dso-viewer-grid
      ?filterpanel-open=${filterpanelOpen}
      ?overlay-open=${overlayOpen}
      @dsoMainSizeChange=${dsoMainSizeChange}
      @dsoCloseOverlay=${dsoCloseOverlay}
      @dsoFilterpanelApply=${dsoFilterpanelApply}
      @dspFilterpanelCancel=${dsoFilterpanelCancel}
      initial-main-size=${ifDefined(initialMainSize)}
    >
      ${filterpanel ? html`<div slot="filterpanel">${filterpanel}</div>` : nothing}
      <div slot="main">${main}</div>
      <div slot="map">${map}</div>
      ${overlay ? html`<div slot="overlay">${overlay}</div>` : nothing}
    </dso-viewer-grid>
  `;
}
