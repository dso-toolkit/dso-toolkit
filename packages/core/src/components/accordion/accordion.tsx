import { Component, ComponentInterface, Element, Host, Method, Prop, h } from "@stencil/core";
import { createStore } from "@stencil/store";

import { AccordionInternalState, AccordionVariant } from "./accordion.interfaces";

@Component({
  tag: "dso-accordion",
  styleUrl: "accordion.scss",
  shadow: true,
})
export class Accordion implements ComponentInterface {
  private readonly accordionState: AccordionInternalState;

  @Element()
  host!: HTMLDsoAccordionElement;

  constructor() {
    const { state } = createStore<AccordionInternalState>({
      variant: "default",
      reverseAlign: false,
    });

    this.accordionState = state;
  }

  /**
   * The variant of the Accordion.
   */
  @Prop()
  get variant(): AccordionVariant {
    return this.accordionState.variant;
  }
  set variant(value: AccordionVariant) {
    this.accordionState.variant = value || "default";
  }

  /**
   * Places the chevron at the opposite side.
   *
   * Note: this mode does not display `state`, `attachmentCount` or `status` props on Accordion Sections
   */
  @Prop()
  get reverseAlign() {
    return this.accordionState.reverseAlign;
  }
  set reverseAlign(value: boolean) {
    this.accordionState.reverseAlign = value || false;
  }

  /**
   * @internal
   */
  @Method()
  async _getState(): Promise<AccordionInternalState> {
    return this.accordionState;
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
