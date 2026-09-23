import { Component, ComponentInterface, Element, Host, Method, Prop, h } from "@stencil/core";
import { createStore } from "@stencil/store";

import { AccordionInternalState, AccordionVariant } from "./accordion.interfaces";

/**
 * @slot - A slot for the accordion sections.
 */
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
      showStroke: true,
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
   * Show or hide the bottom border (stroke) for compact and renvooi variants.
   * @default true
   */
  @Prop()
  get showStroke(): boolean {
    return this.accordionState.showStroke;
  }
  set showStroke(value: boolean) {
    this.accordionState.showStroke = Boolean(value);
  }

  /**
   * Automatische detectie of deze accordion genest zit binnen een accordion-section.
   */
  get isNested(): boolean {
    return this.host.closest("dso-accordion-section") !== null;
  }

  /**
   * @internal
   */
  @Method()
  async _getState(): Promise<AccordionInternalState> {
    return this.accordionState;
  }

  render() {
    const hideStroke = !this.showStroke || this.isNested;

    return (
      <Host class={{ "dso-accordion-no-stroke": hideStroke }}>
        <slot></slot>
      </Host>
    );
  }
}
