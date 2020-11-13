import { Component, h, Prop } from '@stencil/core';
import clsx from 'clsx';

@Component({
  tag: 'dso-label',
  styleUrl: 'label.scss',
  shadow: true
})
export class Label {
  @Prop()
  level?: 'primary' | 'info' |  'primary' | 'success' | 'warning' | 'danger';

  // @Prop()
  // status?: string;

  @Prop()
  button?: boolean;

  render() {
    return (
      <span class={clsx('dso-label', { [`dso-label-${this.level}`]: this.level })}>
        {this.button && (
          <button type="button">
            <svg class="di di-times">
              <use href="/dso-icons.svg#times"></use>
            </svg>
          </button>
        )}
        <slot></slot>
      </span>
    );
  }
}
