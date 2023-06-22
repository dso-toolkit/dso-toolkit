export function isAccordionGroup(element: Element): element is HTMLDsoAccordionGroupElement {
  return element.tagName === "DSO-ACCORDION-GROUP";
}
