import { FunctionalComponent, h } from "@stencil/core";
import { clsx } from "clsx";

interface TooltipProps {
  visible: boolean;
  onAfterHidden: () => void;
  tipElementRef: (ref: HTMLDivElement | undefined) => void;
  tipArrowElementRef: (ref: HTMLSpanElement | undefined) => void;
}

export const Tooltip: FunctionalComponent<TooltipProps> = (
  { visible, onAfterHidden, tipElementRef, tipArrowElementRef },
  children,
) => (
  <div
    popover="manual"
    id="tooltip"
    class={clsx(["dso-tooltip", { visible }])}
    ref={tipElementRef}
    onTransitionEnd={(e) => {
      e.stopPropagation();

      if (e.propertyName === "opacity" && !visible) {
        onAfterHidden();
      }
    }}
  >
    <span class="tooltip-arrow" ref={tipArrowElementRef}></span>
    <div class="tooltip-inner">{children}</div>
  </div>
);
