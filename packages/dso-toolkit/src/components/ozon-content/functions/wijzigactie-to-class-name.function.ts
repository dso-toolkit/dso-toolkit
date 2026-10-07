import { OzonContentWijzigActie } from "../ozon-content.interfaces";

export function wijzigactieToClassName(wijzigactie: OzonContentWijzigActie | undefined): string | undefined {
  if (wijzigactie === "voegtoe") {
    return "editaction-add";
  }

  if (wijzigactie === "verwijder") {
    return "editaction-remove";
  }

  return undefined;
}
