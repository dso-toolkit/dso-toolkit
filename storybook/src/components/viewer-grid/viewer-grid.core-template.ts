import { ViewerGrid } from "dso-toolkit";
import { html, nothing, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { ComponentImplementation } from "../../templates";

export const coreViewerGrid: ComponentImplementation<ViewerGrid<TemplateResult>> = {
  component: "viewerGrid",
  implementation: "core",
  template: () =>
    function viewerGridTemplate(props) {
      const {
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
      } = props;

      return html`
        <dso-viewer-grid
          ?filterpanel-open=${filterpanelOpen}
          ?overlay-open=${overlayOpen}
          @dsoMainSizeChange=${dsoMainSizeChange}
          @dsoCloseOverlay=${dsoCloseOverlay}
          @dsoFilterpanelApply=${dsoFilterpanelApply}
          @dsoFilterpanelCancel=${dsoFilterpanelCancel}
          initial-main-size=${ifDefined(initialMainSize)}
        >
          ${filterpanel ? html`<div slot="filterpanel">${filterpanel}</div>` : nothing}
          <div slot="main">${main}</div>
          <div slot="map">${map}</div>
          ${overlay ? html`<div slot="overlay">${overlay}</div>` : nothing}
        </dso-viewer-grid>
        ${props.show
          ? html`
          <dso-modal modal-title="Reproductie titel"><div slot="body">Content</body></dso-modal>
        `
          : nothing}
      `;
    },
};
