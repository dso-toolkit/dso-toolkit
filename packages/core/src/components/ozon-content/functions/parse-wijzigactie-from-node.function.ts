import { OzonContentWijzigActie } from "../ozon-content.interfaces";

export function parseWijzigactieFromNode(node: Node): OzonContentWijzigActie | undefined {
  const wijzigactie = node instanceof Element ? node.getAttribute("wijzigactie") : undefined;

  return wijzigactie === "voegtoe" || wijzigactie === "verwijder" ? wijzigactie : undefined;
}
