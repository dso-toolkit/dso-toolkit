import { Component, h, Prop } from '@stencil/core';
import clsx from 'clsx';

@Component({
  tag: 'dso-highlight-box',
  styleUrl: 'highlight-box.scss',
  shadow: true
})
export class HighlightBox {
  @Prop()
  modifier?: 'dso-yellow' | 'dso-border' | 'dso-white' | 'dso-drop-shadow';

  @Prop()
  step?: number;

  @Prop()
  icon?: string;

  @Prop()
  label?: string;

  render() {
    return (
      <div class={ clsx('dso-highlight-box', this.modifier, {[`dso-has-counter`]: this.step || (this.icon && this.label) } )}>
        {(this.step || (this.icon && this.label)) && (
          <div class="dso-step-counter">
            {this.step
              ? (
                this.step
              )
              : (
                <slot name="highlightboxIcon"></slot>
              )
            }
          </div>
        )}
        <slot></slot>
      </div>
    );
  }
}
