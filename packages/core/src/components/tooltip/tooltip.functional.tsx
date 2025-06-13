import { FunctionalComponent, h } from "@stencil/core";
import clsx from "clsx";

interface TooltipProps {
  visible: boolean;
  small: boolean;
}

export const Tooltip: FunctionalComponent<TooltipProps> = ({ small, visible }, children) => (
  <div popover="manual" class={clsx(["tooltip", { visible }])}>
    <span class="tooltip-arrow"></span>
    <div class={clsx(["tooltip-inner", { small }])}>{children}</div>
  </div>
);
