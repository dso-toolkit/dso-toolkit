import { positionTooltip } from "./position-tooltip.function";
import { TooltipClean, TooltipPlacement } from "./tooltip.interfaces";

export interface ToggletipControllerOptions {
  getReferenceElement: () => HTMLElement | undefined;
  getTipElement: () => HTMLElement | undefined;
  getTipArrowElement: () => HTMLElement | undefined;
  getRestrictContentElement?: () => HTMLElement | undefined;
  getPlacement: () => TooltipPlacement;
}

/**
 * Shared controller for the click/keyboard Toggletip behaviour used by Badge,
 * Info Button and Ozon Content Toggletip. Intended to be called from `componentDidRender`.
 */
export class ToggletipController {
  private cleanUpFunction: TooltipClean | undefined;

  constructor(private options: ToggletipControllerOptions) {}

  update(active: boolean): void {
    const tipRef = this.options.getTipElement();

    if (!this.cleanUpFunction && active) {
      const referenceElement = this.options.getReferenceElement();
      const tipArrowRef = this.options.getTipArrowElement();

      if (referenceElement && tipRef && tipArrowRef) {
        this.cleanUpFunction = positionTooltip({
          referenceElement,
          tipRef,
          tipArrowRef,
          placementTip: this.options.getPlacement(),
          restrictContentElement: this.options.getRestrictContentElement?.(),
        });
      }
    }

    if (this.cleanUpFunction) {
      if (active) {
        tipRef?.showPopover();
      } else {
        tipRef?.hidePopover();
        this.cleanUpToggletip();
      }
    }
  }

  dispose(): void {
    this.cleanUpToggletip();
  }

  private cleanUpToggletip(): void {
    this.cleanUpFunction?.();
    this.cleanUpFunction = undefined;
  }
}

/**
 * Determines whether an event originated outside `host`, based on `event.composedPath()`.
 * Used for outside-dismiss handling of a Toggletip.
 */
export function isEventOutside(host: Element, event: Event): boolean {
  return !event.composedPath().includes(host);
}
