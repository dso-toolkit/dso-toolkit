import { h, Component, ComponentInterface, Prop, Host, Method, Watch, Element } from "@stencil/core";

import { AccordionInternalState, AccordionVariant } from "./accordion.interfaces";

import { createStore } from "@stencil/store";

@Component({
  tag: "dso-accordion",
  styleUrl: "accordion.scss",
  shadow: true,
})
export class Accordion implements ComponentInterface {
  private accordionState: AccordionInternalState;

  @Element()
  host!: HTMLDsoAccordionElement;

  /**
   * The variant of the Accordion.
   */
  @Prop({ reflect: true })
  variant: AccordionVariant = "default";

  /**
   * Places the chevron at the opposite side.
   *
   * Note: this mode does not display `state`, `attachmentCount` or `status` props on Accordion Sections
   */
  @Prop({ reflect: true })
  reverseAlign = false;

  @Watch("variant")
  updateVariant(variant: AccordionVariant = "default") {
    this.accordionState.variant = variant;
  }

  @Watch("reverseAlign")
  updateReverseAlign(reverseAlign: boolean) {
    this.accordionState.reverseAlign = reverseAlign;
  }

  /**
   * @internal
   */
  @Method()
  async _getState(): Promise<AccordionInternalState> {
    return this.accordionState;
  }

  componentWillLoad() {
    this.accordionState.variant = this.variant;
    this.accordionState.reverseAlign = this.reverseAlign;
  }

  constructor() {
    const { state } = createStore<AccordionInternalState>({});

    this.accordionState = state;
  }

  render() {
    return (
      <Host class="dso-accordion">
        <slot></slot>
      </Host>
    );
  }
}
