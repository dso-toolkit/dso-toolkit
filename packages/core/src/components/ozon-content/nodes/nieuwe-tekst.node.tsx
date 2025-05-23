import { h } from "@stencil/core";

import { OzonContentNode } from "../ozon-content-node.interface";
import { OzonContentNodeContext } from "../ozon-content-node-context.interface";

export class OzonContentNieuweTekstNode implements OzonContentNode {
  name = "NieuweTekst";

  render(node: Element, { mapNodeToJsx }: OzonContentNodeContext) {
    return <ins class="new-text">{mapNodeToJsx(node.childNodes)}</ins>;
  }
}
