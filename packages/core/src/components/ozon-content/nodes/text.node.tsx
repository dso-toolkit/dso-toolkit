import { Fragment, h } from "@stencil/core";

import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentTextNode implements OzonContentNode {
  name = "#text";

  render(node: Node) {
    return <Fragment>{node.textContent}</Fragment>;
  }
}
