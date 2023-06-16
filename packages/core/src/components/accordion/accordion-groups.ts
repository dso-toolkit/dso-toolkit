import { controlOpenAttribute } from "./accordion.functions";
import { AccordionGroupConfig, AccordionGroupState } from "./accordion.interfaces";

import { createStore } from "@stencil/store";

export class AccordionGroup {
  store = createStore<AccordionGroupState>({
    allowMultipleOpen: false,
  });

  private accordions: HTMLElement[] = [];

  sections() {
    return this.accordions.reduce<HTMLElement[]>(
      (current, accordion) => [
        ...current,
        ...Array.from(accordion.querySelectorAll<HTMLElement>(":scope > dso-accordion-section")),
      ],
      []
    );
  }

  register(accordion: HTMLElement) {
    this.accordions.push(accordion);
  }

  unregister(accordion: HTMLElement) {
    const index = this.accordions.indexOf(accordion);

    if (index > -1) {
      this.accordions.splice(index, 1);
    }
  }

  setConfig(groupConfig: AccordionGroupConfig) {
    this.store.state = {
      ...this.store.state,
      ...groupConfig,
    };
  }

  updateAllowMultipleOpen(allowMultipleOpen: boolean) {
    this.store.state.allowMultipleOpen = allowMultipleOpen;

    if (!allowMultipleOpen) {
      const openSections = this.accordions.reduce<HTMLElement[]>(
        (current, accordion) => [
          ...current,
          ...Array.from(accordion.querySelectorAll<HTMLElement>(":scope > dso-accordion-section[open]")),
        ],
        []
      );

      // By removing the first section, it is kept open;
      openSections.shift();

      openSections.forEach((section) => controlOpenAttribute(section, false));
    }
  }
}

class AccordionGroups {
  private accordionGroups: Array<{ name: string; group: AccordionGroup }> = [];

  // get(groupName: string, config: AccordionGroupConfig): AccordionGroup {
  get(groupName: string): AccordionGroup {
    let accordionGroup = this.accordionGroups.find((group) => group.name === groupName)?.group;

    if (accordionGroup) {
      // accordionGroup.setConfig(config);
      return accordionGroup;
    }

    // accordionGroup = new AccordionGroup(config);
    accordionGroup = new AccordionGroup();

    this.accordionGroups.push({ name: groupName, group: accordionGroup });

    return accordionGroup;
  }

  list() {
    return this.accordionGroups;
  }
}

export const AccordionService = new AccordionGroups();
