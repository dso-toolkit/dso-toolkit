import { FunctionalComponent, h } from "@stencil/core";

interface TooltipProps {
  id?: string;
  tipElementRef: (ref: HTMLDivElement | undefined) => void;
  tipArrowElementRef: (ref: HTMLSpanElement | undefined) => void;
}

export const Tooltip: FunctionalComponent<TooltipProps> = ({ id, tipElementRef, tipArrowElementRef }, children) => (
  <div id={id} popover="manual" class="dso-tooltip" ref={tipElementRef}>
    <span class="tooltip-arrow" ref={tipArrowElementRef}></span>
    <div class="tooltip-inner">{children}</div>
  </div>
);
