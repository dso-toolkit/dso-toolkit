import { positionTooltip } from "./position-tooltip.function";
import { TooltipClean } from "./tooltip.interfaces";

/**
 * Toggles the tooltip. To be called from the componentDidRender lifecycle method of the component that renders the
 * Tooltip.
 *
 * @param active - a boolean indicating if the tooltip is active
 * @param show - a boolean indicating the s
 * @param container
 * @param tooltip
 * @param tooltipArrow
 *
 * @returns boolean indicating the (new) value of the component class member decorated with @State()
 */
export function toggletip(
  container: HTMLElement | undefined,
  tooltip: HTMLElement | undefined,
  tooltipArrow: HTMLElement | undefined,
  active: boolean,
  show: boolean,
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
      placementTip: "top",
    });
  }

  if (!active && cleanUp) {
    cleanUp();
  }

  return show;
}
