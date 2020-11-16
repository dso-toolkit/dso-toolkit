import { Component, h, Prop } from '@stencil/core';
import clsx from 'clsx';

@Component({
  tag: 'dso-badge',
  styleUrl: 'badge.scss',
  shadow: true
})
export class Badge {
  @Prop()
  status?: 'primary' | 'success' | 'info' | 'warning' | 'danger';

  private static statusMap = new Map<string, string>([
    ['primary', 'Primair'],
    ['success', 'Gelukt'],
    ['info', 'Opmerking'],
    ['warning', 'Waarschuwing'],
    ['danger', 'Fout']
  ]);

  render() {
    return (
      <span class={clsx('dso-badge', { [`badge-${this.status}`]: this.status })}>
        {this.status && (
          <span class="sr-only">{Badge.statusMap.get(this.status)}: </span>
        )}
        <slot></slot>
      </span>
    );
  }
}
