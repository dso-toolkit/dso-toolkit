import { Fragment, h } from "@stencil/core";

import { OzonContentNode } from "../ozon-content-node.interface";
import { OzonContentNodeContext } from "../ozon-content-node-context.interface";

export class OzonContentDocumentNode implements OzonContentNode {
  name = "#document";

  render(node: Node, { mapNodeToJsx }: OzonContentNodeContext) {
    return <Fragment>{mapNodeToJsx(node.childNodes)}</Fragment>;
  }
}
