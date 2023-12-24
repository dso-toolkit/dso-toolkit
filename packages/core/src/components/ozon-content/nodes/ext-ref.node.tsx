import { h } from "@stencil/core";
import kebabCase from "lodash.kebabcase";

import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentExtRefNode implements OzonContentNode {
  name = ["ExtRef", "ExtIoRef"];

  render(node: Element, { mapNodeToJsx }: OzonContentNodeContext) {
    const href = node.tagName === "ExtIoRef" ? node.getAttribute("href") : node.getAttribute("ref");
    const className = kebabCase(node.tagName);

    return (
      <a target="_blank" rel="noopener noreferrer" href={href ?? undefined} class={className}>
        {mapNodeToJsx(node.childNodes)} <span class="sr-only">(Opent andere website in nieuw tabblad)</span>
        <dso-icon icon="external-link"></dso-icon>
      </a>
    );
  }
}
