import { EventEmitter, FunctionalComponent, h } from "@stencil/core";
import clsx from "clsx";

import { ViewerGridPanelSize, ViewerGridChangeSizeAnimationEndEvent, ViewerGridMode } from "../viewer-grid.interfaces";
import { SizingButtons } from "./sizing-buttons";

export interface ViewerGridMainPanelProps {
  mode: ViewerGridMode;
  tabView: boolean;
  mainSize: ViewerGridPanelSize;
  documentPanelOpen: boolean;
  mainPanelExpanded: boolean;
  mainPanelHidden: boolean;
  shrinkMain: () => void;
  expandMain: () => void;
  toggleMainPanel: () => void;
  dsoMainSizeChangeAnimationEnd: EventEmitter<ViewerGridChangeSizeAnimationEndEvent>;
}

export const MainPanel: FunctionalComponent<ViewerGridMainPanelProps> = ({
  mode,
  tabView,
  mainSize,
  documentPanelOpen,
  mainPanelExpanded,
  mainPanelHidden,
  shrinkMain,
  expandMain,
  toggleMainPanel,
  dsoMainSizeChangeAnimationEnd,
}) => (
  <div
    class={clsx("dso-main-panel", {
      compact: !tabView && documentPanelOpen && !mainPanelExpanded,
      contracted: !tabView && !documentPanelOpen && !mainPanelExpanded && mode === "vdk",
      expanded: !tabView && documentPanelOpen && mainPanelExpanded,
      collapsed: mainPanelHidden,
    })}
    onTransitionEnd={(e) => {
      if (e.propertyName === "flex-basis") {
        dsoMainSizeChangeAnimationEnd.emit({ currentSize: mainSize });
      }
    }}
  >
    {!tabView &&
      ((mode === "vrk" && (
        <SizingButtons
          panelLabel="Hoofdpaneel"
          size={mainSize}
          expand={expandMain}
          shrink={shrinkMain}
          placement="left"
        />
      )) ||
        (mode === "vdk" && documentPanelOpen && (
          <div class="toggle-button">
            <button type="button" onClick={toggleMainPanel}>
              <span class="sr-only">Zoeken paneel {mainPanelHidden ? "tonen" : "verbergen"}</span>
              <dso-icon icon={mainPanelHidden ? "chevron-right" : "chevron-left"}></dso-icon>
            </button>
          </div>
        )))}
    <div class={clsx("content", { invisible: mainPanelHidden })}>
      <slot name="main" />
    </div>
  </div>
);
