import { Placement, arrow, autoUpdate, computePosition, flip, hide, offset, shift } from "@floating-ui/dom";

export function positionTooltip(
  referenceElement: HTMLElement,
  tipRef: HTMLElement,
  tipArrowRef: HTMLElement,
  placementTip: Placement,
  topPositionSmallViewPort = false,
) {
  return autoUpdate(referenceElement, tipRef, () => {
    const padding = 5;
    const arrowLength = tipArrowRef.offsetWidth;

    // Get half the arrow box's hypotenuse length
    const mainAxisOffset = Math.sqrt(2 * arrowLength ** 2) / 2;

    // 1.5 times the diagonal of the arrow box
    const arrowPadding = arrowLength * Math.sqrt(2) * 1.5;

    const smallViewport = topPositionSmallViewPort && document.body.clientWidth < 992;

    // Set placement to bottom if viewport is small and topPositionSmallViewPort is set to true
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
          padding: arrowPadding,
          element: tipArrowRef,
        }),
        hide({
          padding: arrowPadding + arrowLength + padding,
        }),
      ],
      placement,
    }).then(({ x, y, middlewareData, placement: computedPlacement, strategy: position }) => {
      if (middlewareData.hide) {
        // Tooltip needs to be visible at all times on small viewports
        const disappear = !smallViewport && middlewareData.hide.referenceHidden;
        Object.assign(tipRef.style, {
          // Both of these properties have a CSS transition
          visibility: disappear ? "hidden" : "visible",
          opacity: disappear ? 0 : 1,
        });
      }

      Object.assign(tipRef.style, {
        left: `${x}px`,
        top: `${y}px`,
        position,
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
          [staticSide]: `${-arrowLength / 2}px`,
          transform: `rotate(${angle}deg)`,
        });
      }
    });
  });
}
