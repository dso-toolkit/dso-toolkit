import { Placement } from "@floating-ui/dom";

import { positionTooltip } from "./position-tooltip.function";
import { TooltipClean } from "./tooltip.interfaces";

/**
 * Toggles the tooltip. To be called from the componentDidRender lifecycle method of the component that renders the
 * Tooltip.
 *
 * @param active - a boolean indicating if the toooltip is active
 * @param show - a boolean indicating the state of the tooltip
 * @param container -
 * @param tooltip -
 * @param tooltipArrow -
 * @param placement -
 * @param placement -
 *
 * @returns boolean indicating the (new) value of the component class member decorated with @State()
 */
export function toggletip(
  container: HTMLElement | undefined,
  tooltip: HTMLElement | undefined,
  tooltipArrow: HTMLElement | undefined,
  active: boolean,
  show: boolean,
  placement: Placement,
): boolean {
  if (tooltip) {
    if (active && !show) {
      tooltip.showPopover();
      show = true;
    } else if (!active && show) {
      tooltip?.hidePopover();
      show = false;
    }
  }

  let cleanUp: TooltipClean | undefined;

  if (active && !cleanUp && container && tooltip && tooltipArrow) {
    cleanUp = positionTooltip({
      referenceElement: container,
      tipRef: tooltip,
      tipArrowRef: tooltipArrow,
      placementTip: placement,
    });
  }

  if (!active && cleanUp) {
    cleanUp();
  }

  return show;
}
