import { EventEmitter, FunctionalComponent, h } from "@stencil/core";

import {
  ViewerGridPanelSize,
  ViewerGridChangeSizeAnimationEndEvent,
  viewerGridSizeLabelMap,
} from "../viewer-grid.interfaces";

export interface ViewerGridDocumentPanelProps {
  tabView: boolean;
  panelSize: ViewerGridPanelSize;
  shrinkDocumentPanel: () => void;
  expandDocumentPanel: () => void;
  dsoDocumentPanelSizeChangeAnimationEnd: EventEmitter<ViewerGridChangeSizeAnimationEndEvent>;
}

export const DocumentPanel: FunctionalComponent<ViewerGridDocumentPanelProps> = ({
  tabView,
  panelSize,
  shrinkDocumentPanel,
  expandDocumentPanel,
  dsoDocumentPanelSizeChangeAnimationEnd,
}) => (
  <div
    class="dso-document-panel"
    onTransitionEnd={(e) => {
      if (e.propertyName === "flex-basis") {
        dsoDocumentPanelSizeChangeAnimationEnd.emit({ currentSize: panelSize });
      }
    }}
  >
    {!tabView && (
      <div class="sizing-buttons">
        <span class="sr-only" aria-live="polite" aria-atomic="true">
          Breedte documentpaneel: {viewerGridSizeLabelMap[panelSize]}
        </span>
        {panelSize !== "small" && (
          <button type="button" class="shrink" onClick={shrinkDocumentPanel}>
            <span class="sr-only">Documentpaneel smaller maken</span>
            <dso-icon icon="chevron-right"></dso-icon>
          </button>
        )}
        {panelSize !== "large" && (
          <button type="button" class="expand" onClick={expandDocumentPanel}>
            <span class="sr-only">Documentpaneel breder maken</span>
            <dso-icon icon="chevron-left"></dso-icon>
          </button>
        )}
      </div>
    )}
    <div class="content">
      <slot name="document-panel" />
    </div>
  </div>
);
