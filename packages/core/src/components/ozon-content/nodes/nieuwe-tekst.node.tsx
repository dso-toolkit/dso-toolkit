import { h } from "@stencil/core";

import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentNieuweTekstNode implements OzonContentNode {
  name = "NieuweTekst";

  render(node: Element, { mapNodeToJsx }: OzonContentNodeContext) {
    return <ins class="nieuwe-tekst">{mapNodeToJsx(node.childNodes)}</ins>;
  }
}
