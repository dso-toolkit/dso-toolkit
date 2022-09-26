import { h, Component, Event, Prop, EventEmitter, Method, Host, State } from '@stencil/core';
import clsx from 'clsx';

export interface InfoButtonToggleEvent {
  originalEvent: MouseEvent;
  active: boolean;
}

@Component({
  tag: 'dso-info-button',
  shadow: true,
  styleUrl: 'info-button.scss'
})
export class InfoButton {
  private button?: HTMLButtonElement;

  @Prop({ mutable: true, reflect: true })
  active?: boolean;

  @State()
  hover = false;

  @Prop()
  secondary?: boolean;

  @Prop()
  label = 'Toelichting bij optie';

  @Event()
  dsoToggle!: EventEmitter<InfoButtonToggleEvent>;

  @Method() async setFocus() {
    this.button?.focus();
  }

  private handleToggle(e: MouseEvent) {
    this.active = !this.active;
    this.dsoToggle.emit({ originalEvent: e, active: this.active });
  }

  render() {
    return (
      <Host onMouseenter={() => this.hover = true} onMouseleave={() => this.hover = false}>
        <button
          type="button"
          class={clsx('btn', { 'dso-open': !!this.active, 'dso-info-secondary': !!this.secondary })}
          aria-expanded={typeof this.active === 'boolean' ? this.active.toString() : undefined}
          onClick={e => this.handleToggle(e)}
          ref={element => (this.button = element)}
        >
          <dso-icon icon={this.active || this.hover ? 'info-active' : 'info'}></dso-icon>
          <span class="sr-only">
            {this.label}
          </span>
        </button>
      </Host>
    );
  }
}
