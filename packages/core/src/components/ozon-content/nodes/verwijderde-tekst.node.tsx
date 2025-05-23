import { h } from "@stencil/core";

import { OzonContentNode } from "../ozon-content-node.interface";
import { OzonContentNodeContext } from "../ozon-content-node-context.interface";

export class OzonContentVerwijderdeTekstNode implements OzonContentNode {
  name = "VerwijderdeTekst";

  render(node: Element, { mapNodeToJsx }: OzonContentNodeContext) {
    return <del class="removed-text">{mapNodeToJsx(node.childNodes)}</del>;
  }
}
