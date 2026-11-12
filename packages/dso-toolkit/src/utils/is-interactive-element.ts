export const isInteractiveElement = (element: HTMLElement): boolean => {
  return (
    element instanceof HTMLButtonElement ||
    element instanceof HTMLAnchorElement ||
    element instanceof HTMLInputElement ||
    element.tagName.startsWith("DSO-TOGGLETIP")
  );
};
