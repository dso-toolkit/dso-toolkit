import { ViewerGrid } from "dso-toolkit";
import { TemplateResult, html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreViewerGrid: ComponentImplementation<ViewerGrid<TemplateResult>> = {
  component: "viewerGrid",
  implementation: "core",
  template: () =>
    function viewerGridTemplate({
      filterPanelOpen,
      filterPanelTitle,
      overlayOpen,
      documentPanelOpen,
      mainSize,
      documentPanelSize,
      mainPanelExpanded,
      mainPanelHidden,
      activeTab,
      dsoMainSizeChangeAnimationEnd,
      dsoCloseFilterPanel,
      dsoCloseOverlay,
      dsoActiveTabSwitch,
      dsoDocumentPanelSizeChange,
      dsoDocumentPanelSizeChangeAnimationEnd,
      dsoMainPanelExpand,
      dsoMainPanelToggle,
      filterPanel,
      topBar,
      main,
      map,
      documentPanel,
      overlay,
    }) {
      return html`
        <dso-viewer-grid
          main-size=${ifDefined(mainSize)}
          document-panel-size=${ifDefined(documentPanelSize)}
          active-tab=${ifDefined(activeTab)}
          filter-panel-title=${ifDefined(filterPanelTitle)}
          ?filter-panel-open=${filterPanelOpen}
          ?overlay-open=${overlayOpen}
          ?document-panel-open=${documentPanelOpen}
          ?main-panel-expanded=${mainPanelExpanded}
          ?main-panel-hidden=${mainPanelHidden}
          @dsoMainSizeChangeAnimationEnd=${dsoMainSizeChangeAnimationEnd}
          @dsoCloseOverlay=${dsoCloseOverlay}
          @dsoCloseFilterPanel=${dsoCloseFilterPanel}
          @dsoActiveTabSwitch=${dsoActiveTabSwitch}
          @dsoDocumentPanelSizeChange=${dsoDocumentPanelSizeChange}
          @dsoDocumentPanelSizeChangeAnimationEnd=${dsoDocumentPanelSizeChangeAnimationEnd}
          @dsoMainPanelExpand=${dsoMainPanelExpand}
          @dsoMainPanelToggle=${dsoMainPanelToggle}
        >
          ${filterPanel ? html`<div slot="filter-panel">${filterPanel}</div>` : nothing}
          <div slot="top-bar">${topBar}</div>
          <div slot="main">${main}</div>
          <div slot="map">${map}</div>
          ${documentPanel ? html`<div slot="document-panel">${documentPanel}</div>` : nothing}
          ${overlay ? html`<div slot="overlay">${overlay}</div>` : nothing}
        </dso-viewer-grid>
      `;
    },
};
