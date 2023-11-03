import { EventEmitter, FunctionalComponent, h } from "@stencil/core";

import { ViewerGridPanelSize, ViewerGridChangeSizeAnimationEndEvent } from "../viewer-grid.interfaces";
import { SizingButtons } from "./sizing-buttons";

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
      <SizingButtons
        panelLabel="Documentpaneel"
        size={panelSize}
        expand={expandDocumentPanel}
        shrink={shrinkDocumentPanel}
        placement="right"
      />
    )}
    <div class="content">
      <slot name="document-panel" />
    </div>
  </div>
);
