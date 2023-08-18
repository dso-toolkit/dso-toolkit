import { FunctionalComponent, h } from "@stencil/core";
import { LabelSizeMap, MainSize } from "../viewer-grid.interfaces";

export interface ViewerGridMainPanelProps {
  ref: ((element: HTMLDivElement | undefined) => void) | undefined;
  tabView: boolean;
  mainSize: MainSize;
  shrinkMain: () => void;
  expandMain: () => void;
}

export const MainPanel: FunctionalComponent<ViewerGridMainPanelProps> = ({
  ref,
  tabView,
  mainSize,
  shrinkMain,
  expandMain,
}) => {
  const sizeLabelMap: LabelSizeMap = {
    small: "smal",
    medium: "middel",
    large: "breed",
  };

  return (
    <div class="dso-main-panel" ref={ref}>
      {!tabView && (
        <div class="sizing-buttons">
          <span class="sr-only" aria-live="polite" aria-atomic="true">
            Breedte hoofdpaneel: {sizeLabelMap[mainSize]}
          </span>
          <button type="button" class="shrink" disabled={mainSize === "small"} onClick={shrinkMain}>
            <span class="sr-only">Hoofdpaneel smaller maken</span>
            <dso-icon icon="chevron-left"></dso-icon>
          </button>
          <button type="button" class="expand" disabled={mainSize === "large"} onClick={expandMain}>
            <span class="sr-only">Hoofdpaneel breder maken</span>
            <dso-icon icon="chevron-right"></dso-icon>
          </button>
        </div>
      )}
      <div class="main">
        <slot name="main" />
      </div>
    </div>
  );
};
