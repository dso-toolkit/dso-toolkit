import { Component, h, Prop, Event, EventEmitter, State } from '@stencil/core';
import clsx from 'clsx';

@Component({
  tag: 'dso-label',
  styleUrl: 'label.scss',
  shadow: true
})
export class Label {
  @Prop()
  compact?: boolean;

  @Prop()
  removable?: boolean;

  @Prop()
  status?: 'primary' | 'info' | 'success' | 'warning' | 'danger';

  @State()
  hovering?: boolean;

  @Event()
  removeClick!: EventEmitter<MouseEvent>;

  private static statusMap = new Map<string, string>([
    ['primary', 'Primair'],
    ['info', 'Info'],
    ['success', 'Succes'],
    ['warning', 'Waarschuwing'],
    ['danger', 'Gevaar']
  ]);

  render() {
    const status = this.status && Label.statusMap.get(this.status);

    return (
      <span class={clsx('dso-label', { [`dso-label-${this.status}`]: this.status, 'dso-label-compact': this.compact && !this.removable, 'dso-label-hover': this.hovering })}>
        {status && (
          <span class="sr-only">{status}: </span>
        )}
        <slot></slot>
        {this.removable && (
          <button type="button" onClick={e => this.removeClick.emit(e)} title="Verwijder" onMouseEnter={() => this.hovering = true} onMouseLeave={() => this.hovering = false}>
            <dso-icon icon="times"></dso-icon>
          </button>
        )}
      </span>
    );
  }
}
