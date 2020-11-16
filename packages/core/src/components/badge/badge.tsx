import { Component, h, Prop } from '@stencil/core';
import clsx from 'clsx';

@Component({
  tag: 'dso-badge',
  styleUrl: 'badge.scss',
  shadow: true
})
export class Badge {
  @Prop()
  level!: 'primary' | 'success' | 'info' | 'warning' | 'danger';

  @Prop()
  status?: string;

  render() {
    return (
      <span class={clsx('dso-badge', { [`badge-${this.level}`]: this.level })}>
        {this.status && (
          <span class="sr-only">{this.status}: </span>
        )}
        <slot></slot>
      </span>
    );
  }
}
