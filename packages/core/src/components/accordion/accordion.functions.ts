export function isSectionOpen(sectionElement: HTMLElement): boolean {
  return typeof sectionElement.getAttribute("open") === "string";
}

export function controlOpenAttribute(sectionElement: HTMLElement, setAttribute: boolean): void {
  if (setAttribute) {
    sectionElement.setAttribute("open", "");
  } else {
    sectionElement.removeAttribute("open");
  }
}

export function isAccordion(element: Element): element is HTMLDsoAccordionElement {
  return element.tagName === "DSO-ACCORDION";
}
