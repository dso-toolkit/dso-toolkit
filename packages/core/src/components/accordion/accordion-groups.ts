import { controlOpenAttribute, isSectionOpen } from "./accordion.functions";
import { AccordionGroupConfig, AccordionGroupState, isAccordion } from "./accordion.interfaces";

import { createStore } from "@stencil/store";

export class AccordionGroup {
  private state;

  private accordions: HTMLElement[] = [];

  constructor(config: AccordionGroupConfig) {
    const { state } = createStore<AccordionGroupState>({
      allowMultipleOpen: config.allowMultipleOpen || false,
    });

    this.state = state;
  }

  register(accordion: HTMLElement) {
    this.accordions.push(accordion);
  }

  unregister(accordion: HTMLElement) {
    this.accordions = this.accordions.filter((a) => a !== accordion);
  }

  getState() {
    return this.state;
  }

  setConfig(groupConfig: AccordionGroupConfig) {
    this.state = {
      ...this.state,
      ...groupConfig,
    };
  }

  updateAllowMultipleOpen(allowMultipleOpen: boolean) {
    this.state.allowMultipleOpen = allowMultipleOpen;

    if (!allowMultipleOpen) {
      const openSections = this.accordions.reduce(
        (current, accordion) => [
          ...current,
          ...Array.from(accordion.querySelectorAll<HTMLElement>(":scope > dso-accordion-section[open]")),
        ],
        [] as HTMLElement[]
      );

      // By removing the first section, it is kept open;
      openSections.shift();

      openSections.forEach((section) => controlOpenAttribute(section, false));
    }
  }

  async toggleSection(sectionElement: HTMLElement | number, event?: MouseEvent) {
    const sections = this.accordions.reduce(
      (current, accordion) => [
        ...current,
        ...Array.from(accordion.querySelectorAll<HTMLElement>(":scope > dso-accordion-section")),
      ],
      [] as HTMLElement[]
    );

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

    if (this.state.allowMultipleOpen) {
      controlOpenAttribute(sectionElement, !sectionIsOpen);

      const accordion = sectionElement.closest("dso-accordion");

      if (isAccordion(accordion)) {
        accordion.emitToggleEvent(sectionElement, sections, event);
      }

      return !sectionIsOpen;
    }

    if (sectionIsOpen) {
      controlOpenAttribute(sectionElement, false);

      const accordion = sectionElement.closest("dso-accordion");

      if (isAccordion(accordion)) {
        accordion.emitToggleEvent(sectionElement, sections, event);
      }

      return false;
    }

    await this.closeOpenSections();

    controlOpenAttribute(sectionElement, true);

    const accordion = sectionElement.closest("dso-accordion");

    if (isAccordion(accordion)) {
      accordion.emitToggleEvent(sectionElement, sections, event);
    }

    return true;
  }

  async closeOpenSections(): Promise<void> {
    const sections = this.accordions.reduce(
      (current, accordion) => [
        ...current,
        ...Array.from(accordion.querySelectorAll<HTMLElement>(":scope > dso-accordion-section")),
      ],
      [] as HTMLElement[]
    );

    const openSections = sections.filter((s) => isSectionOpen(s));
    openSections.forEach((section) => controlOpenAttribute(section, false));
  }
}

class AccordionGroups {
  private accordionGroups: Array<{ name: string; group: AccordionGroup }> = [];

  get(groupName: string, config: AccordionGroupConfig): AccordionGroup {
    let accordionGroup = this.accordionGroups.find((group) => group.name === groupName)?.group;

    if (accordionGroup) {
      accordionGroup.setConfig(config);
      return accordionGroup;
    }

    accordionGroup = new AccordionGroup(config);

    this.accordionGroups.push({ name: groupName, group: accordionGroup });

    return accordionGroup;
  }

  list() {
    return this.accordionGroups;
  }
}

export const AccordionService = new AccordionGroups();
