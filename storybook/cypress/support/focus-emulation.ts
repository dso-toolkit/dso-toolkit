import { getActiveElement } from "@dso-toolkit/core/src/utils/get-active-element";

/**
 * Safari geeft een link of button bij een muisklik geen focus. De focus gaat dan naar niets en de focusout heeft geen
 * relatedTarget. Chromium doet dat niet, dus bootsen we het na voor de eerstvolgende mousedown op het element.
 */
export function emulateSafariMouseFocus($element: JQuery<HTMLElement>): void {
  const element = $element.get(0)!;

  element.addEventListener(
    "mousedown",
    (event) => {
      event.preventDefault();

      const activeElement = getActiveElement(element.ownerDocument);

      if (activeElement instanceof element.ownerDocument.defaultView!.HTMLElement) {
        activeElement.blur();
      }
    },
    { once: true },
  );
}

/**
 * Een klik op een niet-focusbaar deel van een menu haalt de focus weg zonder nieuw doel. De focusout heeft dan geen
 * relatedTarget en de focus komt op de body.
 */
export function blurActiveElement(document: Document): void {
  const activeElement = getActiveElement(document);

  if (activeElement instanceof document.defaultView!.HTMLElement) {
    activeElement.blur();
  }
}

/**
 * Heeft het browservenster geen focus, dan verstuurt de browser geen focus-events en bootst `cy.click()` ze zelf na:
 * bij de mousedown, zonder relatedTarget (`simulateBlurEvent` in de Cypress-driver). Dat venster is in een test niet
 * af te dwingen, dus versturen we dezelfde events bij de eerstvolgende mousedown op het element.
 */
export function emulateCypressFocusSimulation($element: JQuery<HTMLElement>): void {
  const element = $element.get(0)!;
  const view = element.ownerDocument.defaultView!;

  element.addEventListener(
    "mousedown",
    () => {
      const activeElement = getActiveElement(element.ownerDocument);

      activeElement?.dispatchEvent(new view.FocusEvent("blur", { cancelable: false, view, relatedTarget: null }));
      activeElement?.dispatchEvent(
        new view.FocusEvent("focusout", { bubbles: true, cancelable: false, view, relatedTarget: null }),
      );
    },
    { once: true },
  );
}
