const DEFAULT_LANG = "nl";

export function getComponentClosestLanguage(element: HTMLElement): string {
  const closestElement = element.closest("[lang]") as HTMLElement;
  return closestElement ? closestElement.lang : DEFAULT_LANG;
}

function fetchLocaleStringsForComponent(componentName: string, locale: string): Promise<any> {
  return new Promise((resolve, reject): void => {
    fetch(`/core/i18n/${componentName}.i18n.${locale}.json`).then(
      (result) => {
        if (result.ok) resolve(result.json());
        else reject();
      },
      () => reject(),
    );
  });
}

export async function getLocaleComponentStrings(element: HTMLElement): Promise<any> {
  const componentName = element.tagName.toLowerCase();
  const componentLanguage = getComponentClosestLanguage(element);
  let strings;
  try {
    strings = await fetchLocaleStringsForComponent(componentName, componentLanguage);
  } catch (e) {
    console.warn(`no locale for ${componentName} (${componentLanguage}) loading default locale en.`);
    strings = await fetchLocaleStringsForComponent(componentName, "en");
  }
  return strings;
}

export interface i18nStrings {
  [key: string]: any;
}
