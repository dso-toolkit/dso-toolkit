import { h } from "@stencil/core";

import { OzonContentNode } from "../ozon-content-node.interface";
import { OzonContentNodeContext } from "../ozon-content-node-context.interface";

export class OzonContentInlineNodes implements OzonContentNode {
  name = ["sub", "sup", "strong", "b", "u", "i", "br"];

  render(node: Element, { mapNodeToJsx }: OzonContentNodeContext) {
    if (node.localName === "br") {
      return <br />;
    }

    const Tag = node.localName;

    return <Tag>{mapNodeToJsx(node.childNodes)}</Tag>;
  }
}
