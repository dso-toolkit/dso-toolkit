import { h, Component, ComponentInterface, Prop, Host, Method, Watch } from '@stencil/core';

import { AccordionInternalState, AccordionVariant } from './accordion.interfaces';

import { createStore } from '@stencil/store';

@Component({
  tag: 'dso-accordion',
  styleUrl: 'accordion.scss',
  shadow: true,
})
export class Accordion implements ComponentInterface {
  accordionState: AccordionInternalState;

  /**
   *
   */
  @Prop({ reflect: true })
  variant?: AccordionVariant = 'default';

  /**
   *
   */
  @Prop({ reflect: true })
  reverseAlign = false;

  /**
   *
   */
  @Prop({ reflect: true })
  allowMultiple = false;

  @Watch('variant')
  updateVariant(variant: AccordionVariant = 'default') {
    this.accordionState.variant = variant || 'default';
  }

  @Method()
  async getState() {
    return this.accordionState;
  }

  constructor() {
    const { state } = createStore<AccordionInternalState>({
      variant: this.variant || 'default',
    });

    this.accordionState = state;
  }

  render() {
    return (
      <Host class={{
        'dso-accordion': true
      }}>
        <slot></slot>
      </Host>
    );
  }
}
