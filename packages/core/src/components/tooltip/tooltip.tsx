import { beforeWrite, createPopper, Instance as PopperInstance, Placement, State as PopperState } from "@popperjs/core";
import maxSize from "popper-max-size-modifier";
import {
  h,
  Component,
  Element,
  Host,
  Method,
  Prop,
  State,
  Watch,
  ComponentInterface,
  Event,
  EventEmitter,
} from "@stencil/core";
import clsx from "clsx";
import { hasOverflow } from "../../utils/has-overflow";
import debounce from "debounce";

import { TooltipCloseEvent } from "./tooltip.interfaces";

// Keep const in sync with $tooltip-transition-duration in dso-toolkit/src/components/tooltip/tooltip.scss tooltip_root() mixin
const transitionDuration = 150;

const applyMaxSize = {
  name: "applyMaxSize",
  enabled: true,
  phase: beforeWrite,
  requires: ["maxSize"],
  fn({ state }: { state: PopperState }) {
    let { width } = state.modifiersData.maxSize;
    if (width < 160) {
      width = 160;
    }

    state.styles.popper = {
      ...state.styles.popper,
      maxWidth: `${width}px`,
    };
  },
};

@Component({
  tag: "dso-tooltip",
  styleUrl: "tooltip.scss",
  shadow: true,
})
export class Tooltip implements ComponentInterface {
  /**
   * Defines if the tooltip is descriptive. A descriptive tooltip contains a meaningful message. Tooltips that are not descriptive are hidden from screenreaders using `aria-hidden`.
   */
  @Prop({
    reflect: true,
  })
  descriptive = false;

  /**
   * Set position of tooltip relative to target
   */
  @Prop()
  position: Placement = "top";

  /**
   * Set position strategy of tooltip
   */
  @Prop()
  strategy: "auto" | "absolute" | "fixed" = "auto";

  /**
   * Set attribute `no-arrow` to hide the arrow
   */
  @Prop()
  noArrow = false;

  /**
   * Deactivates mouseover behaviour
   */
  @Prop()
  stateless?: boolean;

  /**
   * Defines if the tooltip has a smaller max-width
   */
  @Prop()
  small?: boolean;

  /**
   * Whether or not to show the tooltip. To control the tooltip add the `active` attribute or use the `activate()` and `deactivate()` instance methods.
   */
  @Prop({ reflect: true, mutable: true })
  active = false;

  /**
   * The variant of the Tooltip.
   */
  @Prop()
  variant: "onboarding" | undefined;

  /**
   * Emitted when the user closes the Tooltip. Only emitted when the variant is `onboarding` and the user clicks the
   * close-button.
   */
  @Event()
  dsoClose!: EventEmitter<TooltipCloseEvent>;

  /**
   * Activate the tooltip (Sets the `active` attribute)
   */
  @Method()
  async activate(): Promise<void> {
    this.active = true;
  }

  /**
   * Deactivate the tooltip (Removes the `active` attribute)
   */
  @Method()
  async deactivate(): Promise<void> {
    this.active = this.variant === "onboarding";
  }

  @Watch("position")
  watchPosition() {
    if (!this.popper) {
      return;
    }

    this.popper.setOptions({
      placement: this.position,
    });
  }

  @Watch("strategy")
  watchStrategy() {
    this.setStrategy();
  }

  private setStrategy() {
    if (!this.popper) {
      return;
    }

    if (this.strategy === "absolute" || this.strategy === "fixed") {
      this.popper.setOptions({
        strategy: this.strategy,
      });

      return;
    }

    let element: Element | null = this.element;
    while (element && element.parentNode !== document) {
      element = element.parentNode instanceof ShadowRoot ? element.parentNode.host : element.parentElement;
      if (element !== null && hasOverflow(element)) {
        this.popper.setOptions({
          strategy: "fixed",
        });

        return;
      }
    }

    this.popper.setOptions({
      strategy: "absolute",
    });
  }

  @Watch("active")
  watchActive() {
    if (this.active) {
      this.activatePopper();

      if (!this.stateless) {
        setTimeout(() => {
          this.popper?.setOptions({
            modifiers: [{ name: "eventListeners", enabled: true }],
          });
          document.addEventListener("keydown", this.keyDownListener);
        });
      }
    } else {
      document.removeEventListener("keydown", this.keyDownListener);
      this.deactivatePopper();
    }
  }

  @Element()
  private element!: HTMLDsoTooltipElement;

  private popper: PopperInstance | undefined;

  private callbacks: TooltipCallbacks = {
    activate: () => (this.active = true),
    deactivate: () => {
      // Zie https://github.com/dso-toolkit/dso-toolkit/issues/2997#issuecomment-2654330094 voor de aanleiding
      // van setTimeout() met 2ms.
      setTimeout(() => {
        if (this.element.isConnected) {
          this.active = this.variant === "onboarding";
        }
      }, 2);
    },
  };

  private onMouseLeave = () => {
    if (!this.element.matches(":hover") && !this.target?.matches(":hover")) {
      this.callbacks.deactivate();
    }
  };

  @State()
  private hidden = true;

  private listenClick(e: MouseEvent) {
    e.stopPropagation();
  }

  componentDidLoad(): void {
    const tooltip = this.element.shadowRoot?.querySelector(".tooltip");
    if (!(tooltip instanceof HTMLElement)) {
      throw new Error("tooltip element is not instanceof HTMLElement");
    }

    if (!this.stateless && this.target) {
      this.target.addEventListener("mouseenter", this.callbacks.activate);
      [this.element, this.target].forEach((element) => element.addEventListener("mouseleave", this.onMouseLeave));
      this.target.addEventListener("focus", this.callbacks.activate);
      this.target.addEventListener("blur", this.callbacks.deactivate);
    }
  }

  disconnectedCallback(): void {
    this.popper?.destroy();

    if (!this.stateless && this.target) {
      this.target.removeEventListener("mouseenter", this.callbacks.activate);
      [this.element, this.target].forEach((element) => element.removeEventListener("mouseleave", this.onMouseLeave));
      this.target.removeEventListener("focus", this.callbacks.activate);
      this.target.removeEventListener("blur", this.callbacks.deactivate);
    }

    this.target = undefined;
  }

  componentDidRender() {
    if (this.active) {
      this.popper?.update();
    }
  }

  private keyDownListener = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      this.deactivate();
    }
  };

  get headingSlottedElement() {
    return this.element.querySelector("[slot='heading']");
  }

  render() {
    return (
      <Host class={{ hidden: this.hidden }} role="tooltip" onClick={this.listenClick}>
        <div class={clsx("tooltip", { in: this.active }, { "tooltip-onboarding": this.variant === "onboarding" })}>
          {!this.noArrow && <div data-popper-arrow class="tooltip-arrow"></div>}
          <div aria-hidden={!this.descriptive || undefined} class={clsx("tooltip-inner", { "dso-small": this.small })}>
            <div class="tooltip-content-wrapper">
              {this.headingSlottedElement !== null && (
                <div class="tooltip-content-heading">
                  <dso-icon icon="light-bulb"></dso-icon>
                  <slot name="heading" />
                </div>
              )}
              <slot></slot>
            </div>
            {this.variant === "onboarding" && (
              <button type="button" class="dso-close" onClick={(e) => this.dsoClose.emit({ originalEvent: e })}>
                <dso-icon icon="times"></dso-icon>
                <span class="sr-only">Sluiten</span>
              </button>
            )}
          </div>
        </div>
      </Host>
    );
  }

  private deactivatePopper = debounce(() => {
    this.hidden = true;
    this.popper?.destroy();
    this.popper = undefined;
  }, transitionDuration);

  private activatePopper(): void {
    this.hidden = false;

    if (this.popper) {
      return;
    }

    const tooltip = this.element.shadowRoot?.querySelector(".tooltip");

    if (this.target && tooltip instanceof HTMLElement) {
      this.popper = createPopper(this.target, tooltip, {
        placement: this.position,
        modifiers: [maxSize, applyMaxSize, { name: "eventListeners", enabled: false }],
      });

      this.setStrategy();
    }
  }

  private get target(): HTMLElement | undefined {
    return this.#target ?? this.initializeTarget();
  }

  private set target(element: HTMLElement | undefined) {
    this.#target = element;
  }

  #target?: HTMLElement;

  private initializeTarget(): HTMLElement | undefined {
    const id = this.element.id;

    if (!id) {
      console.warn("Unable to find reference tooltip has no [id] attribute.");

      return;
    }

    const rootNode = this.element.getRootNode();
    if (!(rootNode instanceof Document || rootNode instanceof ShadowRoot)) {
      console.warn(`rootNode is not instance of Document or ShadowRoot`);

      return;
    }

    const reference = rootNode.querySelector<HTMLElement>(`[aria-describedBy="${id}`);
    if (!reference) {
      console.warn(`Unable to find reference with aria-describedby ${id}`);

      return;
    }

    this.#target = reference;
    return reference;
  }
}

interface TooltipCallbacks {
  activate: () => void;
  deactivate: () => void;
}
