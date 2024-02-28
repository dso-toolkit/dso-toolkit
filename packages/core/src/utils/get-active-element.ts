export function getActiveElement({ activeElement }: DocumentOrShadowRoot = document): Element | null {
  if (!activeElement) {
    return null;
  }

  if (activeElement.shadowRoot) {
    return getActiveElement(activeElement.shadowRoot) ?? activeElement;
  }

  return activeElement;
}
