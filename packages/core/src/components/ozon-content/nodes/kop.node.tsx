import { Fragment, h } from "@stencil/core";

import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentKopNode implements OzonContentNode {
  name = ["Opschrift", "Label", "Nummer", "Kop"];

  render(node: Element, { mapNodeToJsx }: OzonContentNodeContext) {
    let content = mapNodeToJsx(node.childNodes);
    const wijzigactie = node.getAttribute("wijzigactie");

    if (wijzigactie === "voegtoe") {
      content = <ins class="new-text">{content}</ins>;
    } else if (wijzigactie === "verwijder") {
      content = <del class="removed-text">{content}</del>;
    }

    return (
      <>
        {(node.tagName === "Nummer" || node.tagName === "Opschrift") && " "}
        {content}
      </>
    );
  }
}
