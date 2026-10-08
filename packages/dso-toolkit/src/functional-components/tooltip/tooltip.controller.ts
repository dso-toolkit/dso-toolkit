import { positionTooltip } from "./position-tooltip.function";
import { TooltipClean, TooltipPlacement } from "./tooltip.interfaces";

export interface TooltipControllerOptions {
  getReferenceElement: () => HTMLElement | undefined;
  getTipElement: () => HTMLElement | undefined;
  getTipArrowElement: () => HTMLElement | undefined;
  getPlacement: () => TooltipPlacement;
  /** Delay in ms before the tooltip is shown. Defaults to 0 (no delay). */
  showDelay?: number;
}

/**
 * Shared controller for the positioning, showing, and hiding of a Tooltip.
 */
export class TooltipController {
  private cleanUpFunction: TooltipClean | undefined;
  private tooltipTimeout?: number;
  private lastClickTime = 0;

  constructor(private options: TooltipControllerOptions) {}

  /**
   * Registers a click to suppress the tooltip from (re)appearing within showDelay milliseconds after a click on the
   * reference element.
   */
  notifyClick(): void {
    this.lastClickTime = Date.now();
  }

  show(): void {
    const { showDelay = 0 } = this.options;

    this.clearShowTimeout();

    if (Date.now() - this.lastClickTime < showDelay) {
      return;
    }

    if (showDelay > 0) {
      this.tooltipTimeout = window.setTimeout(this.doShow, showDelay);
    } else {
      this.doShow();
    }
  }

  hide(): void {
    this.clearShowTimeout();

    const tipRef = this.options.getTipElement();

    if (tipRef?.isConnected && tipRef.matches(":popover-open")) {
      tipRef.hidePopover();
    }

    this.cleanUpTooltip();
  }

  dispose(): void {
    this.clearShowTimeout();
    this.cleanUpTooltip();
  }

  private doShow = (): void => {
    const tipRef = this.options.getTipElement();

    if (!tipRef?.isConnected) {
      return;
    }

    tipRef.showPopover();

    if (!this.cleanUpFunction) {
      const referenceElement = this.options.getReferenceElement();
      const tipArrowRef = this.options.getTipArrowElement();

      if (referenceElement && tipArrowRef) {
        this.cleanUpFunction = positionTooltip({
          referenceElement,
          tipRef,
          tipArrowRef,
          placementTip: this.options.getPlacement(),
          topPositionSmallViewPort: false,
          halfMainAxisOffset: false,
          forceVisible: true,
        });
      }
    }
  };

  private clearShowTimeout(): void {
    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
    }
  }

  private cleanUpTooltip(): void {
    this.cleanUpFunction?.();
    this.cleanUpFunction = undefined;
  }
}
