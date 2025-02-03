import { h, Component, ComponentInterface, Prop, Host, Method, Element } from "@stencil/core";
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

  constructor() {
    const { state } = createStore<AccordionInternalState>({});

    this.accordionState = state;
  }

  /**
   * The variant of the Accordion.
   */
  // eslint-disable-next-line @stencil-community/decorators-context
  @Prop({ reflect: true })
  get variant() {
    return this.accordionState.variant;
  }
  set variant(value: undefined | AccordionVariant) {
    this.accordionState.variant = value || "default";
  }

  /**
   * Places the chevron at the opposite side.
   *
   * Note: this mode does not display `state`, `attachmentCount` or `status` props on Accordion Sections
   */
  // eslint-disable-next-line @stencil-community/decorators-context
  @Prop({ reflect: true })
  get reverseAlign() {
    return this.accordionState.reverseAlign || false;
  }
  set reverseAlign(value: boolean) {
    this.accordionState.reverseAlign = value;
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
      <Host class="dso-accordion">
        <slot></slot>
      </Host>
    );
  }
}
