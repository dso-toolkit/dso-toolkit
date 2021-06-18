import { h, Component, Event, Prop, EventEmitter } from '@stencil/core';
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
  @Prop({ mutable: true, reflect: true })
  active?: boolean;

  @Prop()
  label = 'Toelichting bij optie';

  @Event()
  toggle!: EventEmitter<InfoButtonToggleEvent>;

  private handleToggle(e: MouseEvent) {
    this.active = !this.active;
    this.toggle.emit({ originalEvent: e, active: this.active });
  }

  render() {
    return (
      <button
        type="button"
        class={clsx('btn', { 'dso-open': !!this.active })}
        aria-expanded={typeof this.active === 'boolean' ? this.active.toString() : undefined}
        onClick={e => this.handleToggle(e)}
      >
        <span class="sr-only">
          {this.label}
        </span>
      </button>
    );
  }
}
