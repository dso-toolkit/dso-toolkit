import { h } from "@stencil/core";

import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentAbbrNode implements OzonContentNode {
  name = "abbr";

  render(node: Element, { mapNodeToJsx }: OzonContentNodeContext) {
    const title = node.getAttribute("title");

    return (
      <span class="od-abbr">
        <abbr>{mapNodeToJsx(node.childNodes)}</abbr>
        {title && ` (${title})`}
      </span>
    );
  }
}
