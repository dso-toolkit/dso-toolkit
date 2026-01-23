import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  State,
  forceUpdate,
  h,
} from "@stencil/core";

import { positionTooltip } from "../../functional-components/tooltip/position-tooltip.function";
import { TooltipClean, TooltipPlacement } from "../../functional-components/tooltip/tooltip.interfaces";

import { OnboardingTipCloseEvent } from "./onboarding-tip.interfaces";

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
  placement: TooltipPlacement = "right";

  /**
   * Emitted when the user closes the Onboarding Tip.
   */
  @Event()
  dsoClose!: EventEmitter<OnboardingTipCloseEvent>;

  @State()
  ready = false;

  @State()
  popoverOpen = false;

  private mutationObserver?: MutationObserver;

  connectedCallback(): void {
    this.mutationObserver = new MutationObserver(() => forceUpdate(this.host));

    this.mutationObserver.observe(this.host, { attributes: true, childList: true, subtree: true, characterData: true });
  }

  componentDidRender() {
    if (!this.host.isConnected) {
      return;
    }

    if (!this.popoverOpen) {
      this.host.showPopover();
      this.popoverOpen = true;

      const onboardingTipElement = this.host.shadowRoot?.querySelector(".onboarding-tip");
      if (this.hasOnboardingTipElement(onboardingTipElement)) {
        OnboardingTip.setFocus(onboardingTipElement);
      }
    }

    if (!this.cleanUp && this.referenceElement && this.tipArrowRef instanceof HTMLElement) {
      this.cleanUp = positionTooltip({
        referenceElement: this.referenceElement,
        tipRef: this.host,
        tipArrowRef: this.tipArrowRef,
        placementTip: `${this.placement}-start`,
        topPositionSmallViewPort: true,
        halfMainAxisOffset: true,
      });
    }
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    delete this.mutationObserver;
    if (this.popoverOpen) {
      this.host.hidePopover();
      this.popoverOpen = false;
    }
    this.cleanUp?.();
    this.cleanUp = undefined;
  }

  /**
   * Set focus on the onboarding tip element and reset tabIndex for accessibility.
   */
  private static setFocus(target: HTMLElement) {
    if (target) {
      target.tabIndex = -1;
      target.focus();
    }
  }

  private hasOnboardingTipElement(element: Element | null | undefined): element is HTMLElement {
    return element instanceof HTMLElement;
  }

  private blockEscapeKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();

      this.dsoClose.emit({ originalEvent: e });
    }
  };

  render() {
    const ariaLabel = this.headingSlottedElement?.textContent;
    return (
      <Host popover="manual" ready={this.ready} onAnimationend={() => (this.ready = true)}>
        <div role="dialog" class="onboarding-tip" aria-label={ariaLabel} onKeyDown={this.blockEscapeKey}>
          <div class="onboarding-tip-inner">
            <div class="onboarding-tip-content-wrapper">
              {this.headingSlottedElement !== null && (
                <div class="onboarding-tip-content-heading">
                  <dso-icon icon="light-bulb"></dso-icon>
                  <slot name="heading" />
                </div>
              )}
              <dso-icon-button
                class="dso-close"
                label="Sluiten"
                variant="tertiary"
                icon="times"
                onDsoClick={(e) => this.dsoClose.emit({ originalEvent: e })}
              />
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

  private cleanUp: TooltipClean | undefined;

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

    const reference = rootNode.querySelector<HTMLElement>(`[aria-describedby="${id}"]`);
    if (!reference) {
      console.warn(`Unable to find reference element with aria-describedby ${id}`);

      return;
    }

    return reference;
  }
}
