export function isExpandable(element: HTMLElement | null): element is HTMLDsoExpandableElement {
  return element instanceof HTMLElement && element.tagName === "dso-expandable";
}
