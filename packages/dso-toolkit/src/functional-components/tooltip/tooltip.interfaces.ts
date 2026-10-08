import { Placement, autoUpdate } from "@floating-ui/dom";

export type TooltipClean = ReturnType<typeof autoUpdate>;

export type TooltipPlacement = "top" | "right" | "bottom" | "left";

export type TooltipOptions = {
  referenceElement: HTMLElement;
  tipRef: HTMLElement;
  tipArrowRef: HTMLElement;
  placementTip: Placement;
  topPositionSmallViewPort?: boolean;
  halfMainAxisOffset?: boolean;
  forceVisible?: boolean;
  restrictContentElement?: HTMLElement;
};
