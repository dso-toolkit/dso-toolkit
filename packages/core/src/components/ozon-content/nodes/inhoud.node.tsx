import { h } from "@stencil/core";
import clsx from "clsx";

import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentInhoudNode implements OzonContentNode {
  name = ["Inhoud", "ContainerBlocksType", "BlockMixedcontentMetMaximaleInlinesMarkersPopupsType"];

  render(node: Element, { mapNodeToJsx }: OzonContentNodeContext) {
    const editAction = node.getAttribute("wijzigactie");
    return (
      <div
        class={clsx("dso-rich-content", {
          [`wijzigactie-${editAction}`]: editAction,
        })}
      >
        {mapNodeToJsx(node.childNodes)}
      </div>
    );
  }
}
