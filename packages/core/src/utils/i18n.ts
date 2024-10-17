import i18next, { i18n, Resource } from "i18next";

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

export async function dtI18n(element: HTMLElement, resources: Resource): Promise<i18n> {
  const i18NextInstance = i18next.createInstance();
  await i18NextInstance.init({
    lng: getComponentClosestLanguage(element),
    fallbackLng: DEFAULT_LANG,
    resources,
    defaultNS: element.tagName.toLowerCase(),
  });
  return i18NextInstance;
}
