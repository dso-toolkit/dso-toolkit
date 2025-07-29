import { h } from "@stencil/core";

import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentIntRefNode implements OzonContentNode {
  name = "IntRef";

  render(node: Element, { mapNodeToJsx, emitClick }: OzonContentNodeContext) {
    const scope = node.getAttribute("scope");
    if (scope === "Begrip") {
      return;
    }

    const ref = node.getAttribute("ref");
    if (!ref) {
      return mapNodeToJsx(node.childNodes);
    }

    const handleIntRefClick = (event: MouseEvent) => {
      event.preventDefault();

      const target = event.currentTarget;
      if (!(target instanceof HTMLAnchorElement)) {
        return;
      }

      emitClick({
        type: "IntRef",
        node,
        originalEvent: event,
      });
    };

    return (
      <a href={`#${ref}`} onClick={handleIntRefClick}>
        {mapNodeToJsx(node.childNodes)}
      </a>
    );
  }
}
