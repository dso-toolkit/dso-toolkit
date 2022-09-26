import { h, Component, ComponentInterface, Prop, Host, Method, Watch } from '@stencil/core';

import { AccordionHandleElement, AccordionState, AccordionVariant } from './accordion.interfaces';

import { createStore } from '@stencil/store';

@Component({
  tag: 'dso-accordion',
  styleUrl: 'accordion.scss',
  shadow: true,
})
export class Accordion implements ComponentInterface {
  accordionState: AccordionState;

  /**
   * 'anchor' or 'button'
   */
  @Prop({ reflect: true })
  handleElement: AccordionHandleElement = 'anchor';

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

  @Watch('handleElement')
  updateHandleElement(handleElement: AccordionHandleElement = 'anchor') {
    this.accordionState.handleElement = handleElement || 'anchor';
  }

  @Watch('variant')
  updateVariant(variant: AccordionVariant = 'default') {
    this.accordionState.variant = variant || 'default';
  }

  @Method()
  async getState() {
    return this.accordionState;
  }

  constructor() {
    const { state } = createStore<AccordionState>({
      variant: this.variant || 'default',
      handleElement: this.handleElement,
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
