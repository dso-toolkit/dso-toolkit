import { Component, h, Prop } from '@stencil/core';
import clsx from 'clsx';

@Component({
  tag: 'dso-badge',
  styleUrl: 'badge.scss',
  shadow: true
})
export class Badge {
  @Prop()
  status?: 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'outline';

  private static statusMap = new Map<string, string>([
    ['success', 'Gelukt'],
    ['info', 'Opmerking'],
    ['warning', 'Waarschuwing'],
    ['danger', 'Fout'],
    ['outline', 'Rand']
  ]);

  render() {
    return (
      <span class={clsx('dso-badge', { [`badge-${this.status}`]: this.status })}>
        <span class="sr-only">{this.status ? Badge.statusMap.get(this.status) : 'Badge'}: </span>
        <slot></slot>
      </span>
    );
  }
}
