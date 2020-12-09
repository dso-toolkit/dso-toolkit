import { Component, h, Prop, Element } from '@stencil/core'; // 
import clsx from 'clsx';

@Component({
  tag: 'dso-whitebox',
  styleUrl: 'whitebox.scss',
  shadow: true
})
export class WhiteBox {
  @Prop()
  small?: boolean;

  @Prop()
  label?: string;

  @Prop()
  step?: number;

  @Element()
  private element!: HTMLElement;

  render() {
    const whiteboxClass = this.small?'dso-whitebox-small':'dso-whitebox';
    const hasCounter = this.step || !!this.element.querySelector('[slot=icon]');
    
    const classes = clsx(
      whiteboxClass,
      {
        'dso-has-counter': hasCounter
      }
    );

    return (
      <div class={classes}>
        {hasCounter && (
          <div class="dso-step-counter">
            {this.step ?? (
              <slot name="icon"></slot>
            )}
          </div>
        )}
        {this.small ? (
          <a href="#">
            <span class="dso-whitebox-icon">
              <slot name="img"></slot>
            </span>
            <span class="dso-whitebox-link">
              {this.label}
            </span>
          </a>
        ):(
          <p>ik ben groot</p>
        ) }
        {/* <slot></slot> */}
      </div>
    );
  }
}
