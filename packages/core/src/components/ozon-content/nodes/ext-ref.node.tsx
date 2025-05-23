import { h } from "@stencil/core";
import kebabCase from "lodash.kebabcase";

import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentExtRefNode implements OzonContentNode {
  name = ["ExtRef", "ExtIoRef"];

  render(node: Element, { mapNodeToJsx, urlResolver }: OzonContentNodeContext) {
    const className = kebabCase(node.tagName);
    const value = node.getAttribute("ref");
    const name: "ExtRef" | "ExtIoRef" = node.tagName === "ExtRef" ? "ExtRef" : "ExtIoRef";
    const href = urlResolver ? urlResolver(name, "ref", value, node) : value;

    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={href ?? undefined}
        class={className}
        title="Opent andere website in nieuw tabblad"
      >
        <span>{mapNodeToJsx(node.childNodes)}</span>
        <dso-icon icon="external-link"></dso-icon>
      </a>
    );
  }
}
