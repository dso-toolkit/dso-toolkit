import { Component, h, Prop } from '@stencil/core';
import clsx from 'clsx';

@Component({
  tag: 'dso-alert',
  styleUrl: 'alert.scss',
  shadow: true
})
export class Alert {
  @Prop()
  status!: 'success' | 'info' | 'warning' | 'danger';

  private static statusMap = new Map<string, string>([
    ['success', 'Gelukt'],
    ['info', 'Opmerking'],
    ['warning', 'Waarschuwing'],
    ['danger', 'Fout']
  ]);

  render() {
    const status = Alert.statusMap.get(this.status);
    if (!status) {
      throw new Error(`Invalid status ${this.status}`);
    }

    return (
      <div class={clsx('alert', `alert-${this.status}`)} role="alert">
        <span class="sr-only">{status}:</span>
        <slot></slot>
      </div>
    );
  }
}
