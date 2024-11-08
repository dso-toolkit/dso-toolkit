import i18next, { Resource } from "i18next";

export { Resource };

const DEFAULT_LANG = "nl";

function getComponentClosestLanguage(el: HTMLElement): string {
  let element: Element | null = el;
  let closestElement: HTMLElement | null = element.closest("[lang]");

  while (element && element.parentNode !== document && !closestElement) {
    element = element.parentNode instanceof ShadowRoot ? element.parentNode.host : element.parentElement;
    if (element !== null) {
      closestElement = element.closest("[lang]");
    }
  }

  return closestElement ? closestElement.lang : DEFAULT_LANG;
}

export function i18n(
  getElement: () => HTMLElement,
  resources: Resource,
): (key: string, variables?: { [key in string]: string }) => string {
  const element = getElement();
  const i18NextInstance = i18next.createInstance();

  i18NextInstance.init({
    lng: getComponentClosestLanguage(element),
    fallbackLng: DEFAULT_LANG,
    resources,
    defaultNS: element.tagName.toLowerCase(),
  });

  const detectedLanguage = false;

  return (key: string, variables?: { [key in string]: string }) => {
    if (!detectedLanguage) {
      i18NextInstance.language = getComponentClosestLanguage(element);
    }
    return i18NextInstance.t(key, variables);
  };
}
