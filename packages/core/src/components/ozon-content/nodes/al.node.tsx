import { h } from "@stencil/core";

import { getNodeName } from "../get-node-name.function";
import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentAlNode implements OzonContentNode {
  name = "Al";

  render(node: Element, { mapNodeToJsx, path }: OzonContentNodeContext) {
    const nestedAl = path.some((n) => {
      const nodeName = getNodeName(n);

      return nodeName === "Al" || nodeName === "Opschrift";
    });

    const content = mapNodeToJsx(node.childNodes);

    return nestedAl ? <span role="paragraph">{content}</span> : <p>{content}</p>;
  }
}
