import { h } from "@stencil/core";

import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentVerwijderdeTekstNode implements OzonContentNode {
  name = "VerwijderdeTekst";

  render(node: Element, { mapNodeToJsx }: OzonContentNodeContext) {
    return <del>{mapNodeToJsx(node.childNodes)}</del>;
  }
}
