import { Component, h, Prop } from '@stencil/core';
import clsx from 'clsx';

@Component({
  tag: 'dso-alert',
  styleUrl: 'alert.scss',
  shadow: true
})
export class Alert {
  @Prop()
  level: string;

  render() {
    return (
      <div class={clsx('alert', { [`alert-${this.level}`]: this.level })} role="alert">
        <slot></slot>
      </div>
    );
  }
}
