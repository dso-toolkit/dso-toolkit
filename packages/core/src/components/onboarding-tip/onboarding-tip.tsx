import { arrow, autoPlacement, autoUpdate, computePosition, offset, Placement, shift } from "@floating-ui/dom";
import { h, Component, Element, Prop, ComponentInterface, Event, EventEmitter } from "@stencil/core";
import clsx from "clsx";

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
  placement: Placement = "right";

  /**
   * Shows or hides the Onboarding Tip. To show the Onboarding Tip add the attribute `active`. To hide the
   * Onboarding Tip remove the attribute `active`.
   */
  @Prop({ reflect: true })
  active = false;

  /**
   * Emitted when the user closes the Onboarding Tip.
   */
  @Event()
  dsoClose!: EventEmitter<OnboardingTipCloseEvent>;

  componentDidRender() {
    this.initializeOnboardingTip();
  }

  disconnectedCallback(): void {
    this.cleanUp?.();

    this.reference = undefined;
  }

  get headingSlottedElement() {
    return this.host.querySelector("[slot='heading']");
  }

  private cleanUp?: () => void;

  private initializeOnboardingTip() {
    const onboardingElement = this.host.shadowRoot?.querySelector(".onboarding-tip");

    const arrowElem = this.host.shadowRoot?.querySelector(".onboarding-tip-arrow");

    if (this.reference && onboardingElement instanceof HTMLElement && arrowElem instanceof HTMLElement) {
      // Get half the arrow box's hypotenuse length
      const arrowLen = arrowElem.offsetWidth;
      const floatingOffset = Math.sqrt(2 * arrowLen ** 2) / 2;

      this.cleanUp = autoUpdate(this.reference, onboardingElement, () => {
        if (this.reference) {
          computePosition(this.reference, onboardingElement, {
            middleware: [offset(floatingOffset), autoPlacement(), shift({ padding: 5 }), arrow({ element: arrowElem })],
            placement: this.placement,
          }).then(({ x, y, middlewareData, placement }) => {
            Object.assign(onboardingElement.style, {
              left: `${x}px`,
              top: `${y}px`,
            });

            const side = placement.split("-")[0];

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
              Object.assign(arrowElem.style, {
                right: "",
                bottom: "",
                left: arrowX ? `${arrowX}px` : "",
                top: arrowY ? `${arrowY}px` : "",
                [staticSide]: `${-arrowLen / 2}px`,
                transform: `rotate(${angle}deg)`,
              });
            }
          });
        }
      });
    }
  }

  render() {
    return (
      <div class={clsx("onboarding-tip", { active: this.active })} role="tooltip">
        <div class={clsx("onboarding-tip-inner")}>
          <div class="onboarding-tip-content-wrapper">
            {this.headingSlottedElement !== null && (
              <div class="onboarding-tip-content-heading">
                <dso-icon icon="light-bulb"></dso-icon>
                <slot name="heading" />
              </div>
            )}
            <slot></slot>
          </div>
          <button type="button" class="dso-close" onClick={(e) => this.dsoClose.emit({ originalEvent: e })}>
            <dso-icon icon="times"></dso-icon>
            <span class="sr-only">Sluiten</span>
          </button>
        </div>
        <div class="onboarding-tip-arrow"></div>
      </div>
    );
  }

  private get reference(): HTMLElement | undefined {
    return this.#reference ?? this.initializeTarget();
  }

  private set reference(element: HTMLElement | undefined) {
    this.#reference = element;
  }

  #reference?: HTMLElement;

  private initializeTarget(): HTMLElement | undefined {
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

    const reference = rootNode.querySelector<HTMLElement>(`[aria-describedBy="${id}`);
    if (!reference) {
      console.warn(`Unable to find reference element with aria-describedby ${id}`);

      return;
    }

    this.#reference = reference;
    return reference;
  }
}
