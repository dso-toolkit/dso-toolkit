import { EventEmitter, FunctionalComponent, h } from "@stencil/core";
import clsx from "clsx";

import { ViewerGridChangeSizeAnimationEndEvent, ViewerGridPanelSize } from "../viewer-grid.interfaces";

export interface ViewerGridMainPanelProps {
  tabView: boolean;
  mainSize: ViewerGridPanelSize;
  documentPanelOpen: boolean;
  mainPanelExpanded: boolean;
  mainPanelHidden: boolean;
  toggleMainPanel: () => void;
  dsoMainSizeChangeAnimationEnd: EventEmitter<ViewerGridChangeSizeAnimationEndEvent>;
}

export const MainPanel: FunctionalComponent<ViewerGridMainPanelProps> = ({
  tabView,
  mainSize,
  documentPanelOpen,
  mainPanelExpanded,
  mainPanelHidden,
  toggleMainPanel,
  dsoMainSizeChangeAnimationEnd,
}) => (
  <div
    class={clsx("dso-main-panel", {
      compact: !tabView && documentPanelOpen && !mainPanelExpanded,
      contracted: !tabView && !documentPanelOpen && !mainPanelExpanded,
      expanded: !tabView && documentPanelOpen && mainPanelExpanded,
      collapsed: mainPanelHidden,
    })}
    onTransitionEnd={(e) => {
      if (e.propertyName === "flex-basis") {
        dsoMainSizeChangeAnimationEnd.emit({ currentSize: mainSize });
      }
    }}
  >
    {!tabView && documentPanelOpen && (
      <div class="toggle-button">
        <button type="button" onClick={toggleMainPanel}>
          <span class="sr-only">Zoeken paneel {mainPanelHidden ? "tonen" : "verbergen"}</span>
          <dso-icon icon={mainPanelHidden ? "chevron-right" : "chevron-left"}></dso-icon>
        </button>
      </div>
    )}
    <div class={clsx("content", { invisible: mainPanelHidden })}>
      <slot name="main" />
    </div>
  </div>
);
