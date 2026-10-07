import { Fragment, h } from "@stencil/core";

import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentDocumentNode implements OzonContentNode {
  name = "#document";

  render(node: Node, { mapNodeToJsx }: OzonContentNodeContext) {
    return <Fragment>{mapNodeToJsx(node.childNodes)}</Fragment>;
  }
}
