import { ViewerGrid } from "@dso-toolkit/sources";
import { html, TemplateResult } from "lit-html";

export function viewerGridTemplate({
  main,
  map,
  overlay,
  noOverlay,
  overlayOpen,
  closeOverlay,
}: ViewerGrid<TemplateResult>) {
  return noOverlay
    ? html`
        <dso-viewer-grid
          overlay-open=${overlayOpen}
          @closeOverlay=${closeOverlay}
        >
          <div slot="main">${main}</div>
          <div slot="map">${map}</div>
        </dso-viewer-grid>
      `
    : html`
        <dso-viewer-grid
          overlay-open=${overlayOpen}
          @closeOverlay=${closeOverlay}
        >
          <div slot="main">${main}</div>
          <div slot="map">${map}</div>
          <div slot="overlay">${overlay}</div>
        </dso-viewer-grid>
      `;
}
