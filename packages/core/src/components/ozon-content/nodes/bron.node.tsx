import { h } from "@stencil/core";

import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentBronNode implements OzonContentNode {
  name = "Bron";

  render(node: Element, { mapNodeToJsx }: OzonContentNodeContext, ignoreMark: boolean) {
    return <span class="dso-ozon-bron">{mapNodeToJsx(node.childNodes, ignoreMark)}</span>;
  }
}
