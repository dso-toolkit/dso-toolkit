import { Component, h, Prop } from '@stencil/core';
import clsx from 'clsx';

@Component({
  tag: 'dso-highlight-box',
  styleUrl: 'highlight-box.scss',
  shadow: true
})
export class HighlightBox {
  @Prop()
  yellow?: boolean;

  @Prop()
  border?: boolean;

  @Prop()
  white?: boolean;

  @Prop()
  dropShadow?: boolean;

  @Prop()
  step?: number;

  @Prop()
  icon?: string;

  @Prop()
  label?: string;

  render() {
    const classes = clsx(
      'dso-highlight-box',
      {
        'dso-yellow': this.yellow,
        'dso-border': this.border,
        'dso-white': this.white,
        'dso-drop-shadow': this.dropShadow,
        'dso-has-counter': this.step || (this.icon && this.label)
      }
    );

    return (
      <div class={classes}>
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
