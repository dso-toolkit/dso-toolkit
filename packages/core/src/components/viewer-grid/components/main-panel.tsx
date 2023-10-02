import { EventEmitter, FunctionalComponent, h } from "@stencil/core";
import clsx from "clsx";

import {
  ViewerGridPanelSize,
  ViewerGridChangeSizeAnimationEndEvent,
  ViewerGridMode,
  viewerGridSizeLabelMap,
} from "../viewer-grid.interfaces";

export interface ViewerGridMainPanelProps {
  mode: ViewerGridMode;
  tabView: boolean;
  mainSize: ViewerGridPanelSize;
  documentPanelOpen: boolean;
  mainPanelExpanded: boolean;
  mainPanelHidden: boolean;
  shrinkMain: () => void;
  expandMain: () => void;
  expandContent: () => void;
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
  expandContent,
  toggleMainPanel,
  dsoMainSizeChangeAnimationEnd,
}) => (
  <div
    class={clsx("dso-main-panel", {
      compact: !tabView && documentPanelOpen && !mainPanelExpanded,
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
      (!documentPanelOpen ? (
        <div class="sizing-buttons">
          <span class="sr-only" aria-live="polite" aria-atomic="true">
            Breedte {mode === "vdk" ? "zoeken paneel" : "hoofdpaneel"}: {viewerGridSizeLabelMap[mainSize]}
          </span>
          {mainSize !== "small" && (
            <button type="button" class="shrink" onClick={shrinkMain}>
              <span class="sr-only">{mode === "vdk" ? "Zoeken paneel" : "Hoofdpaneel"} smaller maken</span>
              <dso-icon icon="chevron-left"></dso-icon>
            </button>
          )}
          {mainSize !== "large" && (
            <button type="button" class="expand" onClick={expandMain}>
              <span class="sr-only">{mode === "vdk" ? "Zoeken paneel" : "Hoofdpaneel"} breder maken</span>
              <dso-icon icon="chevron-right"></dso-icon>
            </button>
          )}
        </div>
      ) : (
        <div class="toggle-button">
          <button type="button" onClick={toggleMainPanel}>
            <span class="sr-only">
              {mode === "vdk" ? "Zoeken paneel" : "Hoofdpaneel"} {mainPanelHidden ? "Tonen" : "Verbergen"}
            </span>
            <dso-icon icon={mainPanelHidden ? "chevron-right" : "chevron-left"}></dso-icon>
          </button>
        </div>
      ))}
    <div class={clsx("content", { invisible: mainPanelHidden })}>
      <slot name="main" />
      {!tabView && documentPanelOpen && (
        <button class="dso-tertiary expand-button" onClick={expandContent}>
          <dso-icon icon={mainPanelExpanded ? "chevron-up" : "chevron-down"}></dso-icon>
          <span>{mainPanelExpanded ? "Verberg" : "Toon"} documenten op gekozen locatie</span>
        </button>
      )}
      {documentPanelOpen && mainPanelExpanded && <slot name="main-expanded" />}
    </div>
  </div>
);
