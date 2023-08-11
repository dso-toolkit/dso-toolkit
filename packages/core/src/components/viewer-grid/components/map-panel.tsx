import { FunctionalComponent, h } from "@stencil/core";

export interface ViewerGridMapPanelProps {
  ref: ((elm?: HTMLDivElement | undefined) => void) | undefined;
}

export const MapPanel: FunctionalComponent<ViewerGridMapPanelProps> = ({ ref }, children) => (
  <div class="dso-map-panel" ref={ref}>
    {children}
    <div class="main">
      <slot name="main" />
    </div>
  </div>
);
