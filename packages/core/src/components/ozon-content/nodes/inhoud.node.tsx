import { h } from "@stencil/core";

import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentInhoudNode implements OzonContentNode {
  name = ["Inhoud", "ContainerBlocksType", "BlockMixedcontentMetMaximaleInlinesMarkersPopupsType"];

  render(node: Element, { mapNodeToJsx }: OzonContentNodeContext) {
    const editAction = node.getAttribute("wijzigactie");

    const richContent = <div class="dso-rich-content">{mapNodeToJsx(node.childNodes)}</div>;

    return (
      (!editAction && richContent) ||
      (editAction === "verwijder" && <del class="wijzigactie-verwijder">{richContent}</del>) ||
      (editAction === "voegtoe" && <ins class="wijzigactie-voegtoe">{richContent}</ins>)
    );
  }
}
