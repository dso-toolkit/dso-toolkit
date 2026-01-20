import { Placement, arrow, autoUpdate, computePosition, flip, hide, offset, shift, size } from "@floating-ui/dom";

import { TooltipOptions } from "./tooltip.interfaces";

/**
 * Positions the Tooltip relative to its reference element.
 * The position is recalculated automatically on scroll, resize, or
 * element changes via `autoUpdate`, but is otherwise based only on the
 * provided arguments 'placementTip', 'topPositionSmallViewPort' and 'halfMainAxisOffset'.
 */
export function positionTooltip(options: TooltipOptions) {
  const {
    referenceElement,
    tipRef,
    tipArrowRef,
    placementTip,
    topPositionSmallViewPort,
    halfMainAxisOffset,
    forceVisible = false,
    enableInnerScroll = true,
  } = options;

  return autoUpdate(referenceElement, tipRef, () => {
    const padding = 5;
    const arrowOffsetWidth = tipArrowRef.offsetWidth;
    const axisOffsetCalc = Math.sqrt(2 * arrowOffsetWidth ** 2);
    const mainAxisOffset = halfMainAxisOffset ? axisOffsetCalc / 2 : axisOffsetCalc;
    const arrowPadding = arrowOffsetWidth * Math.sqrt(2) * 1.5;
    const smallViewport = topPositionSmallViewPort && document.body.clientWidth < 992;

    // Set placement to top if viewport is small and topPositionSmallViewPort is set to true
    const placement: Placement = smallViewport ? "top" : placementTip;

    computePosition(referenceElement, tipRef, {
      strategy: "fixed",
      middleware: [
        offset({
          mainAxis: mainAxisOffset,
          alignmentAxis: -arrowPadding,
        }),
        flip({
          padding,
        }),
        shift({
          padding,
        }),
        arrow({
          padding: arrowOffsetWidth,
          element: tipArrowRef,
        }),
        hide({
          padding: arrowOffsetWidth + padding,
        }),
        enableInnerScroll &&
          size({
            apply({ availableHeight }) {
              const inner = tipRef.querySelector(".tooltip-inner") as HTMLDivElement | null;

              if (!inner) return;

              Object.assign(inner.style, {
                maxHeight: `${availableHeight}px`,
              });
            },
          }),
      ],
      placement,
    }).then(({ x, y, middlewareData, placement: computedPlacement, strategy }) => {
      if (middlewareData.hide) {
        // Tooltip needs to be visible at all times on small viewports or when forceVisible is true
        const disappear = !smallViewport && !forceVisible && middlewareData.hide.referenceHidden;

        Object.assign(tipRef.style, {
          // Both of these properties have a CSS transition
          visibility: disappear ? "hidden" : "visible",
          opacity: disappear ? 0 : 1,
        });
      }

      Object.assign(tipRef.style, {
        left: `${x}px`,
        top: `${y}px`,
        strategy,
      });

      const side = computedPlacement.split("-")[0];

      const staticSide = side
        ? {
            top: "bottom",
            right: "left",
            bottom: "top",
            left: "right",
          }[side]
        : "top";

      let angle;
      switch (staticSide) {
        default:
        case "top":
          angle = 45;
          break;
        case "right":
          angle = 135;
          break;
        case "bottom":
          angle = 225;
          break;
        case "left":
          angle = 315;
          break;
      }

      if (middlewareData.arrow && staticSide) {
        const { x: arrowX, y: arrowY } = middlewareData.arrow;

        Object.assign(tipArrowRef.style, {
          right: "",
          bottom: "",
          left: arrowX ? `${arrowX}px` : "",
          top: arrowY ? `${arrowY}px` : "",
          [staticSide]: `${-arrowOffsetWidth / 2}px`,
          transform: `rotate(${angle}deg)`,
        });
      }
    });
  });
}
