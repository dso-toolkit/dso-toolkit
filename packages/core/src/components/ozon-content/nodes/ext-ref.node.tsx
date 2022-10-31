import { h } from "@stencil/core";

import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentExtRefNode implements OzonContentNode {
  name = ["ExtRef", "ExtIoRef"];

  render(node: Element, { mapNodeToJsx }: OzonContentNodeContext) {
    const href = node.tagName === "ExtIoRef" ? node.getAttribute("href") : node.getAttribute("ref");

    return (
      <a target="_blank" rel="noopener noreferrer" href={href ?? undefined}>
        <span class="sr-only">opent in nieuw venster</span>
        {mapNodeToJsx(node.childNodes)}
      </a>
    );
  }
}
