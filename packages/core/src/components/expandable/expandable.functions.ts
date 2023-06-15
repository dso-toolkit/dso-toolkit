export function isExpandable(element: Element | null): element is HTMLDsoExpandableElement {
  return element instanceof Element && element.tagName === "DSO-EXPANDABLE";
}
