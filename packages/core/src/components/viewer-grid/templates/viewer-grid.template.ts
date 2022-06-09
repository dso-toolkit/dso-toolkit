import { ViewerGrid } from "@dso-toolkit/sources";
import { html, nothing, TemplateResult } from "lit-html";

export function viewerGridTemplate({
  filterpanel,
  main,
  map,
  overlay,
  filterpanelOpen,
  overlayOpen,
  mainSizeChange,
  filterpanelApply,
  filterpanelCancel,
  closeOverlay,
}: ViewerGrid<TemplateResult>) {
  return html`
    <dso-viewer-grid
      ?filterpanel-open=${filterpanelOpen}
      ?overlay-open=${overlayOpen}
      @mainSizeChange=${mainSizeChange}
      @closeOverlay=${closeOverlay}
      @filterpanelApply=${filterpanelApply}
      @filterpanelCancel=${filterpanelCancel}
    >
      ${filterpanel ? html`<div slot="filterpanel">${filterpanel}</div>` : nothing}
      <div slot="main">${main}</div>
      <div slot="map">${map}</div>
      ${overlay ? html`<div slot="overlay">${overlay}</div>` : nothing}
    </dso-viewer-grid>
  `;
}
