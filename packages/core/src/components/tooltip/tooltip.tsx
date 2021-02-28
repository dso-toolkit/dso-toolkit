import { Component, h, Prop, Element, State, Method } from '@stencil/core';
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

  @Prop({ reflect: true })
  active = false;

  @State()
  private target: HTMLElement | undefined;

  private callbacks: TooltipCallbacks | undefined;

  @Method()
  async activate(): Promise<void> {
    this.active = true;
  }

  @Method()
  async deactivate(): Promise<void> {
    this.active = false;
  }

  connectedCallback(): void {
    this.target = this.getTarget();

    if (this.target) {
      this.callbacks = {
        activate: () => this.active = true,
        deactivate: () => this.active = false
      };

      this.target.addEventListener('mouseenter', this.callbacks.activate);
      this.target.addEventListener('mouseleave', this.callbacks.deactivate);
      this.target.addEventListener('focus', this.callbacks.activate);
      this.target.addEventListener('blur', this.callbacks.deactivate);
    }
  }

  disconnectedCallback() {
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
      <div class={clsx('tooltip fade', this.position, { in: this.active || !this.target, 'no-arrow': this.noArrow })} role="tooltip">
        <div class="tooltip-arrow"></div>
        <div class="tooltip-inner">
          <slot></slot>
        </div>
      </div>
    );
  }

  private getTarget(): HTMLElement | undefined {
    if (this.for instanceof HTMLElement) {
      return this.for;
    }

    if (typeof this.for === 'string') {
      return document.getElementById(this.for) ?? undefined;
    }

    return this.element.parentElement ?? undefined;
  }
}

interface TooltipCallbacks {
  activate: () => void;
  deactivate: () => void;
}
