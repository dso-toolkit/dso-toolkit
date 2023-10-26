import { FunctionalComponent, h } from "@stencil/core";
import { ViewerGridPanelSize, viewerGridSizeLabelMap } from "../viewer-grid.interfaces";

interface SizingButtonProps {
  panelLabel: string;
  size: ViewerGridPanelSize;
  expand: () => void;
  shrink: () => void;
}

export const SizingButtons: FunctionalComponent<SizingButtonProps> = ({ shrink, expand, size, panelLabel }) => (
  <div class="sizing-buttons">
    <span class="sr-only" aria-live="polite" aria-atomic="true">
      Breedte {panelLabel.toLocaleLowerCase()}: {viewerGridSizeLabelMap[size]}
    </span>
    {size !== "small" && (
      <button type="button" class="shrink" onClick={shrink}>
        <span class="sr-only">{panelLabel} smaller maken</span>
        <dso-icon icon="chevron-left"></dso-icon>
      </button>
    )}
    {size !== "large" && (
      <button type="button" class="expand" onClick={expand}>
        <span class="sr-only">{panelLabel} breder maken</span>
        <dso-icon icon="chevron-right"></dso-icon>
      </button>
    )}
  </div>
);
