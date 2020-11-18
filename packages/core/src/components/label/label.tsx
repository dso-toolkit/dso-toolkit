import { Component, h, Prop } from '@stencil/core';
import clsx from 'clsx';

@Component({
  tag: 'dso-label',
  styleUrl: 'label.scss',
  shadow: true
})
export class Label {
  @Prop()
  status?: 'primary' | 'info' | 'success' | 'warning' | 'danger';

  private static statusMap = new Map<string, string>([
    ['primary', 'Primair'],
    ['info', 'Info'],
    ['success', 'Succes'],
    ['warning', 'Waarschuwing'],
    ['danger', 'Gevaar']
  ]);

  render() {
    return (
      <span class={clsx('dso-label', { [`dso-label-${this.status}`]: this.status } )}>
        <span class="sr-only">{this.status ? Label.statusMap.get(this.status) : `Label`}: </span>
        <slot></slot>
      </span>
    );
  }
}
