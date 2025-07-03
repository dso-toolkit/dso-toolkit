import { arrow, autoUpdate, computePosition, flip, hide, offset, shift } from "@floating-ui/dom";
import { Side } from "@floating-ui/utils";

export function positionTooltip(
  referenceElement: HTMLElement,
  tipRef: HTMLElement,
  tipArrowRef: HTMLElement,
  placement: Side,
  active: boolean,
) {
  return autoUpdate(referenceElement, tipRef, () => {
    const arrowLength = tipArrowRef.offsetWidth;

    // Get half the arrow box's hypotenuse length
    const mainAxisOffset = Math.sqrt(2 * arrowLength ** 2) / 2;

    // 1.5 times the diagonal of the arrow box
    const arrowPadding = arrowLength * Math.sqrt(2) * 1.5;

    computePosition(referenceElement, tipRef, {
      strategy: "fixed",
      middleware: [
        offset({
          mainAxis: mainAxisOffset,
          alignmentAxis: -arrowPadding,
        }),
        flip(),
        shift(),
        arrow({
          padding: arrowPadding,
          element: tipArrowRef,
        }),
        hide({
          padding: arrowPadding + arrowLength,
        }),
      ],
      placement,
    }).then(({ x, y, middlewareData, placement: computedPlacement, strategy: position }) => {
      if (middlewareData.hide) {
        if (active) {
          tipRef.classList.toggle("visible", !middlewareData.hide.referenceHidden);
        } else {
          tipRef.classList.remove("visible");
        }
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
