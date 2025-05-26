import { Resource, createInstance } from "i18next";

export { Resource };

const DEFAULT_LANG = "nl";

function getComponentClosestLanguage(element: HTMLElement): string {
  const closestLangElement = element.closest("[lang]");
  if (closestLangElement instanceof HTMLElement) {
    return closestLangElement.lang || DEFAULT_LANG;
  }

  if (element.parentNode instanceof ShadowRoot && element.parentNode.host instanceof HTMLElement) {
    return getComponentClosestLanguage(element.parentNode.host);
  }

  if (element.parentElement instanceof HTMLElement) {
    return getComponentClosestLanguage(element.parentElement);
  }

  return DEFAULT_LANG;
}

export function i18n(
  getElement: () => HTMLElement,
  resources: Resource,
): (key: string, variables?: { [key in string]: string }) => string {
  const element = getElement();
  const i18NextInstance = createInstance();

  i18NextInstance.init({
    fallbackLng: DEFAULT_LANG,
    resources,
    defaultNS: element.tagName.toLowerCase(),
    interpolation: { escapeValue: false },
  });

  let detectedLanguage = false;

  return (key: string, variables?: { [key in string]: string }) => {
    if (!detectedLanguage) {
      detectedLanguage = true;

      const language = getComponentClosestLanguage(element);
      i18NextInstance.changeLanguage(language);
    }

    return i18NextInstance.t(key, variables);
  };
}
