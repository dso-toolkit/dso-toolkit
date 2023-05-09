import { beforeWrite, createPopper, Instance as PopperInstance, State as PopperState } from "@popperjs/core";
import maxSize from "popper-max-size-modifier";
import { h, Component, Element, Host, Listen, Method, Prop, State, Watch } from "@stencil/core";
import clsx from "clsx";
import { hasOverflow } from "../../utils/has-overflow";
import debounce from "debounce";

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
export class Tooltip {
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
  position: "top" | "right" | "bottom" | "left" = "top";

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
    this.active = false;
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

  setStrategy() {
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
  private element!: HTMLElement;

  private popper: PopperInstance | undefined;

  private callbacks: TooltipCallbacks = {
    activate: () => (this.active = true),
    deactivate: () => (this.active = false),
  };

  @State()
  private hidden = true;

  @Listen("click")
  listenClick(e: MouseEvent) {
    e.stopPropagation();
  }

  componentDidLoad(): void {
    const tooltip = this.element.shadowRoot?.querySelector(".tooltip");
    if (!(tooltip instanceof HTMLElement)) {
      throw new Error("tooltip element is not instanceof HTMLElement");
    }

    if (!this.stateless && this.target) {
      this.target.addEventListener("mouseenter", this.callbacks.activate);
      this.target.addEventListener("mouseleave", this.callbacks.deactivate);
      this.target.addEventListener("focus", this.callbacks.activate);
      this.target.addEventListener("blur", this.callbacks.deactivate);
    }
  }

  disconnectedCallback(): void {
    this.popper?.destroy();

    if (!this.stateless && this.target) {
      this.target.removeEventListener("mouseenter", this.callbacks.activate);
      this.target.removeEventListener("mouseleave", this.callbacks.deactivate);
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

  keyDownListener = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      this.deactivate();
    }
  };

  render() {
    return (
      <Host class={{ hidden: this.hidden }} role="tooltip">
        <div class={clsx("tooltip", { in: this.active })}>
          {!this.noArrow && <div data-popper-arrow class="tooltip-arrow"></div>}
          <div aria-hidden={!this.descriptive || undefined} class={clsx("tooltip-inner", { "dso-small": this.small })}>
            <slot></slot>
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
