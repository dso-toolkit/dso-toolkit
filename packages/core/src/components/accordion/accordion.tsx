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
  AccordionInterface,
  AccordionInternalState,
  AccordionSectionToggleEvent,
  AccordionVariant,
} from "./accordion.interfaces";

import { createStore } from "@stencil/store";

@Component({
  tag: "dso-accordion",
  styleUrl: "accordion.scss",
  shadow: true,
})
export class Accordion implements ComponentInterface, AccordionInterface {
  private accordionState: AccordionInternalState;

  @Element()
  host!: HTMLElement;

  @Prop({ reflect: true })
  variant?: AccordionVariant = "default";

  /** Places the chevron at the opposite side. Note: this mode does not display `state`, `attachmentCount` or `status` props on child `<dso-accordion-section>` elements */
  @Prop({ reflect: true })
  reverseAlign = false;

  /** Allows multiple sections to be open at the same time. */
  @Prop({ reflect: true })
  allowMultipleOpen = false;

  /**
   * Emitted when a section is toggled.
   *
   * `event.detail.originalEvent` contains the original `MouseEvent` when the section is toggled by clicking on the header
   * `event.detail.section` contains the toggled section and its new opened value.\
   * `event.detail.sections` contains all `<dso-accordion-section>` elements belonging to this accordion.
   */
  @Event()
  dsoToggleSection!: EventEmitter<AccordionSectionToggleEvent>;

  @Watch("variant")
  updateVariant(variant: AccordionVariant = "default") {
    this.accordionState.variant = variant || "default";
  }

  @Watch("reverseAlign")
  updateReverseAlign(reverseAlign: boolean) {
    this.accordionState.reverseAlign = reverseAlign;
  }

  @Watch("allowMultipleOpen")
  updateAllowMultipleOpen(allowMultipleOpen: boolean) {
    this.accordionState.allowMultipleOpen = allowMultipleOpen;
  }

  @Watch("allowMultipleOpen")
  watchAllowMultiple(allowMultipleOpen: boolean) {
    if (!allowMultipleOpen) {
      const openSections = Array.from(this.host.querySelectorAll<HTMLElement>(":scope > dso-accordion-section[open]"));

      // By removing the first section, it is kept open;
      openSections.shift();

      openSections.forEach((section) => this.controlOpenAttribute(section, false));
    }
  }

  @Method()
  async getState(): Promise<AccordionInternalState> {
    return this.accordionState;
  }

  /** Toggle a section. Pass the `<dso-accordion-section>` element or the index of the section.\
   * returns `undefined` when no section is toggled.\
   * returns `true` when the section is opened and `false` when the section is closed.
   */
  @Method()
  async toggleSection(sectionElement: HTMLElement | number, event?: MouseEvent): Promise<undefined | boolean> {
    const sections = Array.from(this.host.querySelectorAll<HTMLElement>(":scope > dso-accordion-section"));

    if (typeof sectionElement === "number") {
      sectionElement = sections[sectionElement];
    }

    if (!(sectionElement instanceof HTMLElement) || !sections.includes(sectionElement)) {
      return;
    }

    const sectionIsOpen = this.isSectionOpen(sectionElement);

    if (this.allowMultipleOpen) {
      this.controlOpenAttribute(sectionElement, !sectionIsOpen);
      this.emitToggleEvent(sectionElement, sections, event);
      return !sectionIsOpen;
    }

    if (sectionIsOpen) {
      this.controlOpenAttribute(sectionElement, false);
      this.emitToggleEvent(sectionElement, sections, event);

      return false;
    }

    await this.closeOpenSections();

    this.controlOpenAttribute(sectionElement, true);
    this.emitToggleEvent(sectionElement, sections, event);

    return true;
  }

  /** Closes all sections belonging to this accordion. */
  @Method()
  async closeOpenSections(): Promise<void> {
    const sections = Array.from(this.host.querySelectorAll<HTMLElement>(":scope > dso-accordion-section"));

    const openSections = sections.filter((s) => this.isSectionOpen(s));
    openSections.forEach((section) => this.controlOpenAttribute(section, false));
  }

  // These checks are needed for a React timing issue.
  componentWillLoad() {
    if (this.accordionState.variant !== this.variant) {
      this.accordionState.variant = this.variant || "default";
    }

    if (this.accordionState.reverseAlign !== this.reverseAlign) {
      this.accordionState.reverseAlign = this.reverseAlign;
    }

    if (this.accordionState.allowMultipleOpen !== this.allowMultipleOpen) {
      this.accordionState.allowMultipleOpen = this.allowMultipleOpen;
    }
  }

  constructor() {
    const { state } = createStore<AccordionInternalState>({
      variant: this.variant || "default",
      reverseAlign: this.reverseAlign,
      allowMultipleOpen: this.allowMultipleOpen,
    });

    this.accordionState = state;
  }

  render() {
    return (
      <Host
        class={{
          "dso-accordion": true,
        }}
      >
        <slot></slot>
      </Host>
    );
  }

  private emitToggleEvent(sectionElement: HTMLElement, sections: HTMLElement[], e?: MouseEvent): void {
    this.dsoToggleSection.emit({
      originalEvent: e,
      section: {
        element: sectionElement,
        open: this.isSectionOpen(sectionElement),
      },
      sections,
    });
  }

  private isSectionOpen(sectionElement: HTMLElement): boolean {
    return typeof sectionElement.getAttribute("open") === "string";
  }

  private controlOpenAttribute(sectionElement: HTMLElement, setAttribute: boolean): void {
    if (setAttribute) {
      sectionElement.setAttribute("open", "");
    } else {
      sectionElement.removeAttribute("open");
    }
  }
}
