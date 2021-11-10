import { createPopper, Instance as PopperInstance } from '@popperjs/core';
import { h, Component, Element, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import clsx from 'clsx';

// Keep const in sync with $tooltip-transition-duration in @dso-toolkit/sources/tooltip.scss tooltip_root() mixin
const transitionDuration = 150;

@Component({
  tag: 'dso-tooltip',
  styleUrl: 'tooltip.scss',
  shadow: true
})
export class Tooltip {
  /**
   * Set position of tooltip relative to target
   */
  @Prop()
  position: 'top' | 'right' | 'bottom' | 'left' = 'top';

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

  @Watch('active')
  watchActive() {
    if (this.active) {
      this.hidden = false;
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

  componentDidLoad(): void {
    if (this.popper) {
      return;
    }

    const tooltip = this.element.shadowRoot?.querySelector('.tooltip');
    if (!(tooltip instanceof HTMLElement)) {
      throw new Error('tooltip element is not instanceof HTMLElement');
    }

    this.target = this.getTarget();

    this.popper = createPopper(this.target, tooltip, {
      placement: this.position
    });

    this.callbacks = {
      activate: () => {
        this.hidden = false;

        setTimeout(() => {
          this.active = true;

          this.popper?.setOptions({
            modifiers: [{ name: 'eventListeners', enabled: true }]
          });
        });
      },
      deactivate: () => {
        this.active = false;

        this.popper?.setOptions({
          modifiers: [{ name: 'eventListeners', enabled: false }]
        });

        setTimeout(() => this.hidden = true, transitionDuration);
      }
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
    if (this.active) {
      this.popper?.update();
    }
  }

  render() {
    return (
      <Host hidden={this.hidden}>
        <div class={clsx('tooltip', { in: this.active })} role="tooltip">
          {!this.noArrow && (
            <div class="tooltip-arrow"></div>
          )}
          <div class={clsx('tooltip-inner', { 'dso-small': this.small })}>
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

      const reference = rootNode.getElementById(this.for);
      if (!reference) {
        throw new Error(`Unable to find reference with id ${this.for}`);
      }

      return reference;
    }

    const { parentElement } = this.element;
    if (!parentElement) {
      throw new Error('No reference given with [for] attribute but no parent found either')
    }

    return parentElement;
  }
}

interface TooltipCallbacks {
  activate: () => void;
  deactivate: () => void;
}
