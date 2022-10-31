import { h, Fragment } from "@stencil/core";

import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentOpschriftNode implements OzonContentNode {
  name = "Opschrift";

  render(node: Element, { mapNodeToJsx }: OzonContentNodeContext) {
    return <Fragment>{mapNodeToJsx(node.childNodes)}</Fragment>;
  }
}
