import i18next, { i18n, Resource } from "i18next";

const DEFAULT_LANG = "nl";

function getComponentClosestLanguage(element: HTMLElement): string {
  const closestElement = element.closest("[lang]") as HTMLElement;
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
