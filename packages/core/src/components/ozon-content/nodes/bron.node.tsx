import { h } from "@stencil/core";

import { OzonContentNode } from "../ozon-content-node.interface";
import { OzonContentNodeContext } from "../ozon-content-node-context.interface";

export class OzonContentBronNode implements OzonContentNode {
  name = "Bron";

  render(node: Element, { mapNodeToJsx }: OzonContentNodeContext) {
    return <span class="dso-ozon-bron">{mapNodeToJsx(node.childNodes)}</span>;
  }
}
