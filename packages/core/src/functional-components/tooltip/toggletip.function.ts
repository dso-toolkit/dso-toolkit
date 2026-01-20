import { Placement } from "@floating-ui/dom";

import { positionTooltip } from "./position-tooltip.function";
import { TooltipClean } from "./tooltip.interfaces";

/**
 * Toggles the tooltip. To be called from the componentDidRender lifecycle method of the component that renders the
 * Tooltip.
 *
 * @param referenceElement - the toggletip reference
 * @param tipRef - the tooltip element reference
 * @param tipArrowRef - the tooltip arrow element reference
 * @param active - a boolean indicating if the tooltip is active
 * @param show - a boolean indicating the state of the tooltip
 * @param placementTip - the placement of the tooltip
 *
 * @returns boolean indicating the (new) value of the component class member decorated with @State()
 */
export function toggletip(
  referenceElement: HTMLElement | undefined,
  tipRef: HTMLElement | undefined,
  tipArrowRef: HTMLElement | undefined,
  active: boolean,
  show: boolean,
  placementTip: Placement,
): boolean {
  if (tipRef) {
    if (active && !show) {
      tipRef.showPopover();
      show = true;
    } else if (!active && show) {
      tipRef?.hidePopover();
      show = false;
    }
  }

  let cleanUp: TooltipClean | undefined;

  if (active && !cleanUp && referenceElement && tipRef && tipArrowRef && placementTip) {
    cleanUp = positionTooltip({
      referenceElement,
      tipRef,
      tipArrowRef,
      placementTip,
    });
  }

  if (!active && cleanUp) {
    cleanUp();
  }

  return show;
}
