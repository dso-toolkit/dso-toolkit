import { arrow, autoUpdate, computePosition, hide, offset, Placement, flip, shift } from "@floating-ui/dom";
import { h, Component, Element, Prop, ComponentInterface, Event, EventEmitter, Host } from "@stencil/core";

import { OnboardingTipCloseEvent, OnboardingTipPlacement } from "./onboarding-tip.interfaces";

@Component({
  tag: "dso-onboarding-tip",
  styleUrl: "onboarding-tip.scss",
  shadow: true,
})
export class OnboardingTip implements ComponentInterface {
  @Element()
  private host!: HTMLDsoOnboardingTipElement;

  /**
   * Where to place the Onboarding Tip relative to its reference element.
   */
  @Prop()
  placement: OnboardingTipPlacement = "right";

  /**
   * Emitted when the user closes the Onboarding Tip.
   */
  @Event()
  dsoClose!: EventEmitter<OnboardingTipCloseEvent>;

  componentDidRender() {
    if (!this.host.matches(":popover-open")) {
      this.host.showPopover();
    }

    if (!this.cleanUp && this.referenceElement && this.tipArrowRef instanceof HTMLElement) {
      this.cleanUp = OnboardingTip.positionTip(this.referenceElement, this.host, this.tipArrowRef, this.placement);
    }
  }

  disconnectedCallback(): void {
    if (this.host.matches(":popover-open")) {
      this.host.hidePopover();
    }

    this.cleanUp?.();
    this.cleanUp = undefined;
  }

  /**
   * This function positions the Onboarding Tip relative to its reference element. It is static so the position is calculated
   * only using the passed arguments.
   */
  private static positionTip(
    referenceElement: HTMLElement,
    tipRef: HTMLDsoOnboardingTipElement,
    tipArrowRef: HTMLDivElement,
    placement: Placement,
  ) {
    // Get half the arrow box's hypotenuse length
    const arrowLength = tipArrowRef.offsetWidth;
    const floatingOffset = Math.sqrt(2 * arrowLength ** 2) / 2;
    const padding = 5;

    return autoUpdate(referenceElement, tipRef, () => {
      computePosition(referenceElement, tipRef, {
        strategy: "fixed",
        middleware: [
          offset(floatingOffset),
          flip({
            padding,
          }),
          shift({
            padding,
          }),
          arrow({
            padding: padding + arrowLength,
            element: tipArrowRef,
          }),
          hide({
            padding: 42,
          }),
        ],
        placement,
      }).then(({ x, y, middlewareData, placement: computedPlacement }) => {
        if (middlewareData.hide) {
          Object.assign(tipRef.style, {
            visibility: middlewareData.hide.referenceHidden ? "hidden" : "visible",
          });
        }

        Object.assign(tipRef.style, {
          left: `${x}px`,
          top: `${y}px`,
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

  render() {
    return (
      <Host popover="manual">
        <div class="onboarding-tip" role="tooltip">
          <div class="onboarding-tip-inner">
            <div class="onboarding-tip-content-wrapper">
              {this.headingSlottedElement !== null && (
                <div class="onboarding-tip-content-heading">
                  <dso-icon icon="light-bulb"></dso-icon>
                  <slot name="heading" />
                </div>
              )}
              <button type="button" class="dso-close" onClick={(e) => this.dsoClose.emit({ originalEvent: e })}>
                <dso-icon icon="times"></dso-icon>
                <span class="sr-only">Sluiten</span>
              </button>
              <slot></slot>
            </div>
          </div>
          <div class="onboarding-tip-arrow" ref={(ref) => (this.tipArrowRef = ref)}></div>
        </div>
      </Host>
    );
  }

  private tipArrowRef: HTMLDivElement | undefined;

  private get headingSlottedElement() {
    return this.host.querySelector("[slot='heading']");
  }

  private cleanUp: ReturnType<typeof autoUpdate> | undefined;

  private get referenceElement(): HTMLElement | undefined {
    const id = this.host.id;

    if (!id) {
      console.warn("Unable to find reference. Onboarding Tip has no [id] attribute.");

      return;
    }

    const rootNode = this.host.getRootNode();
    if (!(rootNode instanceof Document || rootNode instanceof ShadowRoot)) {
      console.warn(`rootNode is not instance of Document or ShadowRoot`);

      return;
    }

    const reference = rootNode.querySelector<HTMLElement>(`[aria-describedby="${id}`);
    if (!reference) {
      console.warn(`Unable to find reference element with aria-describedby ${id}`);

      return;
    }

    return reference;
  }
}
