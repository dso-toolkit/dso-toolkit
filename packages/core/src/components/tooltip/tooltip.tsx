import { beforeWrite, createPopper, Instance as PopperInstance, State as PopperState } from '@popperjs/core';
import maxSize from 'popper-max-size-modifier';
import { h, Component, Element, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import clsx from 'clsx';

// Keep const in sync with $tooltip-transition-duration in @dso-toolkit/sources/tooltip.scss tooltip_root() mixin
const transitionDuration = 150;

function hasOverflow (el:Element) : boolean {
  const style = window.getComputedStyle(el);
  const overflowX = style.getPropertyValue('overflow-x');
  const overflowY = style.getPropertyValue('overflow-y');
  const overflowValues = ['hidden', 'clip'];
  return overflowValues.indexOf(overflowX) != -1 || overflowValues.indexOf(overflowY) != -1;
}

@Component({
  tag: 'dso-tooltip',
  styleUrl: 'tooltip.scss',
  shadow: true
})
export class Tooltip {
  /**
   * Defines if the tooltip is descriptive. A descriptive tooltip contains a meaningful message. Tooltips that are not descriptive are hidden from screenreaders using `aria-hidden`.
   */
  @Prop({
    reflect: true
  })
  descriptive = false;

  /**
   * Set position of tooltip relative to target
   */
  @Prop()
  position: 'top' | 'right' | 'bottom' | 'left' = 'top';

  /**
   * Set position strategy of tooltip
   */
  @Prop()
  strategy: 'auto' | 'absolute' | 'fixed' = 'auto';

  /**
   * Specify target element that the tooltip will describe and listens to for events.
   * * `undefined`: The direct parent is used.
   * * `string`: The element is located using `document.getElementById()`
   * * `HTMLElement`: Pass the target element directly
   * If the element is not found an Error is thrown.
   */
  @Prop()
  for?: string | HTMLElement;

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
   * The aria-describedby value of the target element. To use as id of tooltip.
   */
  @State()
  ariaDescribedBy?: string;

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

  @Watch('position')
  watchPosition() {
    if (!this.popper) {
      return;
    }

    this.popper.setOptions({
      placement: this.position
    });
  }

  @Watch('strategy')
  watchStrategy() {
    this.setStrategy();
  }

  setStrategy() {
    if (!this.popper) {
      return;
    }

    if (this.strategy == 'absolute' || this.strategy == 'fixed') {
      this.popper.setOptions({
        strategy: this.strategy,
      });

      return;
    }

    let element: Element | null = this.element;
    while (element?.parentNode != null && element.parentNode != document) {
      element = element.parentNode instanceof ShadowRoot ? element.parentNode.host : element.parentElement;
      if (element != null && hasOverflow(element)) {
        this.popper.setOptions({
          strategy: 'fixed',
        });

        return;
      }
    }

    this.popper.setOptions({
      strategy: 'absolute',
    });
  }

  @Watch('active')
  watchActive() {
    if (this.active) {
      this.hidden = false;

      if (!this.stateless) {
        setTimeout(() => {
          this.popper?.setOptions({
            modifiers: [{ name: 'eventListeners', enabled: true }]
          });
          document.addEventListener('keydown', this.keyDownListener);
        });
      }
    } else {
      if (!this.stateless) {
        this.popper?.setOptions({
          modifiers: [{ name: 'eventListeners', enabled: false }]
        });
        document.removeEventListener('keydown', this.keyDownListener);
      }

      setTimeout(() => (this.hidden = true), transitionDuration);
    }
  }

  @Element()
  private element!: HTMLElement;

  private target: HTMLElement | undefined;

  private popper: PopperInstance | undefined;

  private callbacks: TooltipCallbacks | undefined;

  @State()
  private hidden = true;

  @Listen('click')
  listenClick(e: MouseEvent) {
    e.stopPropagation();
  }

  private applyMaxSize = {
    name: 'applyMaxSize',
    enabled: true,
    phase: beforeWrite,
    requires: ['maxSize'],
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

  componentDidLoad(): void {
    if (this.popper) {
      return;
    }

    const tooltip = this.element.shadowRoot?.querySelector('.tooltip');
    if (!(tooltip instanceof HTMLElement)) {
      throw new Error('tooltip element is not instanceof HTMLElement');
    }

    this.target = this.getTarget();
    this.ariaDescribedBy = this.target.getAttribute('aria-describedby') ?? undefined;

    this.popper = createPopper(this.target, tooltip, {
      placement: this.position,
      modifiers: [maxSize, this.applyMaxSize],
    });

    this.callbacks = {
      activate: () => (this.active = true),
      deactivate: () => (this.active = false)
    };

    if (!this.stateless) {
      this.target.addEventListener('mouseenter', this.callbacks.activate);
      this.target.addEventListener('mouseleave', this.callbacks.deactivate);
      this.target.addEventListener('focus', this.callbacks.activate);
      this.target.addEventListener('blur', this.callbacks.deactivate);
    }
  }

  disconnectedCallback(): void {
    this.popper?.destroy();

    if (!this.stateless && this.target && this.callbacks) {
      this.target.removeEventListener('mouseenter', this.callbacks.activate);
      this.target.removeEventListener('mouseleave', this.callbacks.deactivate);
      this.target.removeEventListener('focus', this.callbacks.activate);
      this.target.removeEventListener('blur', this.callbacks.deactivate);
    }

    this.callbacks = undefined;
    this.target = undefined;
  }

  componentDidRender() {
    this.setStrategy();
    if (this.active) {
      this.popper?.update();
    }
  }

  keyDownListener = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.deactivate();
    }
  };

  render() {
    return (
      <Host class={{ 'hidden': this.hidden }}>
        <div id={this.ariaDescribedBy} class={clsx('tooltip', { in: this.active })} role="tooltip">
          {!this.noArrow && <div data-popper-arrow class="tooltip-arrow"></div>}
          <div aria-hidden={!this.descriptive || undefined} class={clsx('tooltip-inner', { 'dso-small': this.small })}>
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }

  private getTarget(): HTMLElement {
    if (this.for instanceof HTMLElement) {
      return this.for;
    }

    if (typeof this.for === 'string') {
      const rootNode = this.element.getRootNode();
      if (!(rootNode instanceof Document || rootNode instanceof ShadowRoot)) {
        throw new Error(`rootNode is not instance of Document or ShadowRoot`);
      }

      const reference = rootNode.querySelector<HTMLElement>(`[aria-describedby="${this.for}"]`);
      if (!reference) {
        throw new Error(`Unable to find element with aria-describedby ${this.for}`);
      }

      return reference;
    }

    const { parentElement } = this.element;
    if (!parentElement) {
      throw new Error('No reference given with [for] attribute but no parent found either');
    }

    return parentElement;
  }
}

interface TooltipCallbacks {
  activate: () => void;
  deactivate: () => void;
}
