import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Host,
  Method,
  Prop,
  Watch,
  h,
} from "@stencil/core";
import { createStore } from "@stencil/store";

import {
  AccordionInternalState,
  AccordionSectionToggleAnimationEndEvent,
  AccordionSectionToggleEvent,
  AccordionVariant,
} from "./accordion.interfaces";

import { AccordionGroup, AccordionService } from "./accordion-groups";
import { controlOpenAttribute, isSectionOpen } from "./accordion.functions";

@Component({
  tag: "dso-accordion",
  styleUrl: "accordion.scss",
  shadow: true,
})
export class Accordion implements ComponentInterface {
  private accordionState: AccordionInternalState;

  private accordionGroup?: AccordionGroup;

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
   * Allows multiple sections to be open at the same time.
   */
  @Prop({ reflect: true })
  allowMultipleOpen = false;

  /** Set this property on multiple accordions to share functionality */
  @Prop()
  group?: string;

  /**
   * Emitted when a section is toggled.
   *
   * `event.detail.originalEvent` contains the original `MouseEvent` when the section is toggled by clicking on the header
   * `event.detail.section` contains the toggled section and its new opened value.\
   * `event.detail.sections` contains all `<dso-accordion-section>` elements belonging to this accordion.
   */
  @Event()
  dsoToggleSection!: EventEmitter<AccordionSectionToggleEvent>;

  /** Event emitted when the accordion section completes its toggle animation. */
  @Event()
  dsoToggleSectionAnimationEnd!: EventEmitter<AccordionSectionToggleAnimationEndEvent>;

  @Watch("variant")
  updateVariant(variant: AccordionVariant = "default") {
    if (!this.accordionState) {
      return;
    }

    this.accordionState.variant = variant || "default";
  }

  @Watch("reverseAlign")
  updateReverseAlign(reverseAlign: boolean) {
    if (!this.accordionState) {
      return;
    }

    this.accordionState.reverseAlign = reverseAlign;
  }

  @Watch("allowMultipleOpen")
  updateAllowMultipleOpen(allowMultipleOpen: boolean) {
    this.accordionGroup?.updateAllowMultipleOpen(allowMultipleOpen);
  }

  /**
   * @internal
   */
  @Method()
  async _getState(): Promise<AccordionInternalState | undefined> {
    return this.accordionState;
  }

  /**
   * Toggle a section. Pass the `<dso-accordion-section>` element or the index of the section.
   * @param sectionElement The section element that needs to toggle
   * @param event The event that the user triggered
   * @returns The state of the section
   */
  @Method()
  async toggleSection(sectionElement: HTMLElement | number, event?: MouseEvent): Promise<undefined | boolean> {
    const sections = this.accordionGroup
      ? this.accordionGroup.sections()
      : Array.from(this.host.querySelectorAll<HTMLElement>(":scope > dso-accordion-section"));

    if (typeof sectionElement === "number") {
      const section = sections[sectionElement];
      if (section instanceof HTMLElement) {
        sectionElement = section;
      }
    }

    if (!(sectionElement instanceof HTMLElement) || !sections.includes(sectionElement)) {
      return;
    }

    const sectionIsOpen = isSectionOpen(sectionElement);

    if (this.allowMultipleOpen) {
      controlOpenAttribute(sectionElement, !sectionIsOpen);
      this.emitToggleEvent(sectionElement, sections, event);

      return !sectionIsOpen;
    }

    if (sectionIsOpen) {
      controlOpenAttribute(sectionElement, false);
      this.emitToggleEvent(sectionElement, sections, event);

      return false;
    }

    await this.closeOpenSections();

    controlOpenAttribute(sectionElement, true);
    this.emitToggleEvent(sectionElement, sections, event);

    return true;
  }

  @Method()
  async emitToggleEvent(sectionElement: HTMLElement, sections: HTMLElement[], e?: MouseEvent) {
    this.dsoToggleSection.emit({
      originalEvent: e,
      section: {
        element: sectionElement,
        open: isSectionOpen(sectionElement),
      },
      sections,
    });
  }

  /**
   * Emitted when the animation of opening or closing ends.
   */
  @Method()
  async animationEnd(sectionElement: HTMLElement): Promise<void> {
    this.dsoToggleSectionAnimationEnd.emit({
      section: {
        element: sectionElement,
        open: isSectionOpen(sectionElement),
      },
    });
  }

  /** Closes all sections belonging to this accordion or group of which this accordion is a part of. */
  @Method()
  async closeOpenSections(): Promise<void> {
    const sections = this.accordionGroup
      ? this.accordionGroup.sections()
      : Array.from(this.host.querySelectorAll<HTMLElement>(":scope > dso-accordion-section"));

    const openSections = sections.filter((s) => isSectionOpen(s));
    openSections.forEach((section) => controlOpenAttribute(section, false));
  }

  constructor() {
    const { state, set } = createStore<AccordionInternalState>({
      variant: this.variant || "default",
      reverseAlign: this.reverseAlign,
      allowMultipleOpen: this.allowMultipleOpen,
    });

    if (this.group) {
      this.accordionGroup = AccordionService.get(this.group);
      this.accordionGroup.register(this.host);

      const { state: groupState, onChange } = this.accordionGroup.store;

      set("allowMultipleOpen", groupState.allowMultipleOpen);

      onChange("allowMultipleOpen", () => set("allowMultipleOpen", groupState.allowMultipleOpen));
    }

    this.accordionState = state;
  }

  // These checks are needed for a React timing issue.
  componentWillLoad() {
    if (this.accordionState.variant !== this.variant) {
      this.accordionState.variant = this.variant || "default";
    }

    if (this.accordionState.reverseAlign !== this.reverseAlign) {
      this.accordionState.reverseAlign = this.reverseAlign;
    }

    if (!this.accordionGroup && this.accordionState.allowMultipleOpen !== this.allowMultipleOpen) {
      this.accordionState.allowMultipleOpen = this.allowMultipleOpen;
    }
  }

  disconnectedCallback(): void {
    this.accordionGroup?.unregister(this.host);
  }

  render() {
    return (
      <Host class="dso-accordion">
        <slot></slot>
      </Host>
    );
  }
}
