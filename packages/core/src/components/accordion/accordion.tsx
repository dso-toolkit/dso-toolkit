import {
  h,
  Component,
  ComponentInterface,
  Prop,
  Host,
  Method,
  Watch,
  Element,
  Event,
  EventEmitter,
} from "@stencil/core";

import {
  AccordionInternalState,
  AccordionSectionToggleAnimationEndEvent,
  AccordionSectionToggleEvent,
  AccordionVariant,
} from "./accordion.interfaces";

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
  variant?: AccordionVariant = "default";

  /**
   * Places the chevron at the opposite side. Note: this mode does not display `state`, `attachmentCount` or `status` props on child `<dso-accordion-section>` elements
   */
  @Prop({ reflect: true })
  reverseAlign = false;

  /**
   * Emitted when a section is toggled.
   *
   * `event.detail.originalEvent` contains the original `MouseEvent` when the section is toggled by clicking on the header
   * `event.detail.section` contains the toggled section and its new opened value.\
   * `event.detail.sections` contains all `<dso-accordion-section>` elements belonging to this accordion.
   */
  @Event()
  dsoToggleSection!: EventEmitter<AccordionSectionToggleEvent>;

  /**
   * Event emitted when the accordion section completes its toggle animation.
   */
  @Event()
  dsoToggleSectionAnimationEnd!: EventEmitter<AccordionSectionToggleAnimationEndEvent>;

  @Watch("variant")
  updateVariant(variant: AccordionVariant = "default") {
    this.accordionState.variant = variant || "default";
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

  /**
   * @internal
   */
  @Method()
  async _emitToggleSectionEvent(sectionElement: HTMLElement | number, event?: MouseEvent): Promise<void> {
    if (!(sectionElement instanceof HTMLElement)) {
      return;
    }

    this.dsoToggleSection.emit({
      originalEvent: event,
      section: {
        element: sectionElement,
        open: this.isSectionOpen(sectionElement),
      },
    });
  }

  /**
   * @internal
   */
  @Method()
  async _emitToggleSectionAnimationEndEvent(sectionElement: HTMLElement): Promise<void> {
    if (!(sectionElement instanceof HTMLElement)) {
      return;
    }

    this.dsoToggleSectionAnimationEnd.emit({
      section: {
        element: sectionElement,
        open: this.isSectionOpen(sectionElement),
      },
    });
  }

  // These checks are needed for a React timing issue.
  componentWillLoad() {
    if (this.accordionState.variant !== this.variant) {
      this.accordionState.variant = this.variant || "default";
    }

    if (this.accordionState.reverseAlign !== this.reverseAlign) {
      this.accordionState.reverseAlign = this.reverseAlign;
    }
  }

  constructor() {
    const { state } = createStore<AccordionInternalState>({
      variant: this.variant || "default",
      reverseAlign: this.reverseAlign,
    });

    this.accordionState = state;
  }

  render() {
    return (
      <Host class="dso-accordion">
        <slot></slot>
      </Host>
    );
  }

  private isSectionOpen(sectionElement: HTMLElement): boolean {
    return typeof sectionElement.getAttribute("open") === "string";
  }
}
