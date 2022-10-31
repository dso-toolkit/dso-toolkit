import { h } from "@stencil/core";

import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentInhoudNode implements OzonContentNode {
  name = ["Inhoud", "ContainerBlocksType", "BlockMixedcontentMetMaximaleInlinesMarkersPopupsType"];

  render(node: Element, { mapNodeToJsx }: OzonContentNodeContext) {
    return <div class="dso-rich-content">{mapNodeToJsx(node.childNodes)}</div>;
  }
}
