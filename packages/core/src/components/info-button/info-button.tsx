import { h, Component, Event, Prop, EventEmitter, Method } from '@stencil/core';
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

  @Prop()
  secondary?: boolean;

  @Prop()
  label = 'Toelichting bij optie';

  @Event({ eventName: 'dsoToggle' })
  toggleEmitter!: EventEmitter<InfoButtonToggleEvent>;

  @Method() async setFocus() {
    this.button?.focus();
  }

  private handleToggle(e: MouseEvent) {
    this.active = !this.active;
    this.toggleEmitter.emit({ originalEvent: e, active: this.active });
  }

  render() {
    return (
      <button
        type="button"
        class={clsx('btn', { 'dso-open': !!this.active, 'dso-info-secondary': !!this.secondary })}
        aria-expanded={typeof this.active === 'boolean' ? this.active.toString() : undefined}
        onClick={e => this.handleToggle(e)}
        ref={element => (this.button = element)}
      >
        <span class="sr-only">
          {this.label}
        </span>
      </button>
    );
  }
}
