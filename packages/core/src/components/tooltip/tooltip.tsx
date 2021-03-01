import { createPopper, Instance as PopperInstance } from '@popperjs/core';
import { Component, h, Prop, Element, Method } from '@stencil/core';
import clsx from 'clsx';

@Component({
  tag: 'dso-tooltip',
  styleUrl: 'tooltip.scss',
  shadow: true
})
export class Tooltip {
  @Prop()
  position: 'top' | 'right' | 'bottom' | 'left' = 'top';

  @Prop()
  for?: string | HTMLElement;

  @Prop()
  noArrow = false;

  @Element()
  element!: HTMLElement;

  @Prop({ reflect: true, mutable: true })
  active = false;

  private target: HTMLElement | undefined;

  private popper: PopperInstance | undefined;

  private callbacks: TooltipCallbacks | undefined;

  @Method()
  async activate(): Promise<void> {
    this.active = true;
  }

  @Method()
  async deactivate(): Promise<void> {
    this.active = false;
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
      activate: () => this.active = true,
      deactivate: () => this.active = false
    };

    this.target.addEventListener('mouseenter', this.callbacks.activate);
    this.target.addEventListener('mouseleave', this.callbacks.deactivate);
    this.target.addEventListener('focus', this.callbacks.activate);
    this.target.addEventListener('blur', this.callbacks.deactivate);
  }

  disconnectedCallback(): void {
    this.popper?.destroy();

    if (this.target && this.callbacks) {
      this.target.removeEventListener('mouseenter', this.callbacks.activate);
      this.target.removeEventListener('mouseleave', this.callbacks.deactivate);
      this.target.removeEventListener('focus', this.callbacks.activate);
      this.target.removeEventListener('blur', this.callbacks.deactivate);
    }

    this.callbacks = undefined;
    this.target = undefined;
  }

  render() {
    return (
      <div class={clsx('tooltip', { in: this.active })} role="tooltip">
        {!this.noArrow && (
          <div class="tooltip-arrow"></div>
        )}
        <div class="tooltip-inner">
          <slot></slot>
        </div>
      </div>
    );
  }

  private getTarget(): HTMLElement {
    if (this.for instanceof HTMLElement) {
      return this.for;
    }

    if (typeof this.for === 'string') {
      const reference = document.getElementById(this.for);
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
