import { ViewerGrid } from "@dso-toolkit/sources";
import * as React from "react";

import { DsoViewerGrid } from "../..";

import { ComponentImplementation } from "../../templates";

export const reactViewerGrid: ComponentImplementation<ViewerGrid<JSX.Element>> = {
  component: "viewerGrid",
  implementation: "react",
  template: () =>
    function viewerGridTemplate({
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
    }) {
      return (
        <DsoViewerGrid
          filterpanelOpen={filterpanelOpen}
          overlayOpen={overlayOpen}
          initialMainSize={initialMainSize}
          onDsoMainSizeChange={dsoMainSizeChange}
          onDsoCloseOverlay={(e) => dsoCloseOverlay?.(e.detail)}
          onDsoFilterpanelApply={(e) => dsoFilterpanelApply?.(e.detail.originalEvent)}
          onDsoFilterpanelCancel={(e) => dsoFilterpanelCancel?.(e.detail.originalEvent)}
        >
          {filterpanel && <div slot="filterpanel">{filterpanel}</div>}
          <div slot="main">{main}</div>
          <div slot="map">{map}</div>
          {overlay && <div slot="overlay">{overlay}</div>}
        </DsoViewerGrid>
      );
    },
};
