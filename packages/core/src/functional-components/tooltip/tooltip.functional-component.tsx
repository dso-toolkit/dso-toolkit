import { FunctionalComponent, h } from "@stencil/core";
import clsx from "clsx";

interface TooltipProps {
  visible: boolean;
  tipElementRef: (ref: HTMLDivElement | undefined) => void;
  tipArrowElementRef: (ref: HTMLSpanElement | undefined) => void;
}

export const Tooltip: FunctionalComponent<TooltipProps> = (
  { visible, tipElementRef, tipArrowElementRef },
  children,
) => (
  <div popover="manual" id="tooltip" class={clsx(["dso-tooltip", { visible }])} ref={tipElementRef}>
    <span class="tooltip-arrow" ref={tipArrowElementRef}></span>
    <div class="tooltip-inner">{children}</div>
  </div>
);
