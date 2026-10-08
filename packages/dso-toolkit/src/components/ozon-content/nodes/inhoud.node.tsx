import { h } from "@stencil/core";

import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentInhoudNode implements OzonContentNode {
  name = ["Inhoud", "ContainerBlocksType", "BlockMixedcontentMetMaximaleInlinesMarkersPopupsType"];

  render(node: Element, { mapNodeToJsx }: OzonContentNodeContext) {
    const wijzigactie = node.getAttribute("wijzigactie");

    const richContent = <div class="dso-rich-content">{mapNodeToJsx(node.childNodes)}</div>;

    if (wijzigactie === "verwijder") {
      return <del class="editaction-remove">{richContent}</del>;
    }

    if (wijzigactie === "voegtoe") {
      return <ins class="editaction-add">{richContent}</ins>;
    }

    return richContent;
  }
}
