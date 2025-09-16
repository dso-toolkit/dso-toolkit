import { Placement, autoUpdate } from "@floating-ui/dom";
import { Component, ComponentInterface, Element, Event, EventEmitter, Host, Prop, State, h } from "@stencil/core";

import { positionTooltip } from "../../functional-components/tooltip/position-tooltip.function";
import { TooltipPlacement } from "../../functional-components/tooltip/tooltip.interfaces";

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

  componentDidRender() {
    if (!this.host.matches(":popover-open")) {
      this.host.showPopover();
    }

    if (!this.cleanUp && this.referenceElement && this.tipArrowRef instanceof HTMLElement) {
      this.cleanUp = positionTooltip(
        this.referenceElement,
        this.host,
        this.tipArrowRef,
        this.normalizedPlacement,
        true,
        true,
      );
    }
  }

  disconnectedCallback(): void {
    if (this.host.matches(":popover-open")) {
      this.host.hidePopover();
    }

    this.cleanUp?.();
    this.cleanUp = undefined;
  }

  render() {
    return (
      <Host popover="manual" ready={this.ready} onAnimationend={() => (this.ready = true)}>
        <div class="onboarding-tip" role="tooltip">
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
                accessibleLabel="Sluiten"
                variant="tertiary"
                icon="times"
                onClick={(e) => this.dsoClose.emit({ originalEvent: e })}
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

  private get normalizedPlacement(): Placement {
    return `${this.placement}-start`;
  }
}
