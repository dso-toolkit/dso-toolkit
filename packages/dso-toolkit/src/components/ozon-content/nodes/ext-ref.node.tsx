import { h } from "@stencil/core";
import kebabCase from "lodash.kebabcase";

import { isModifiedEvent } from "../../../utils/is-modified-event";
import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentExtRefNode implements OzonContentNode {
  name = ["ExtRef", "ExtIoRef"];

  render(node: Element, { mapNodeToJsx, emitClick, urlResolver }: OzonContentNodeContext) {
    const className = kebabCase(node.tagName);
    const ref = node.getAttribute("ref");
    const name: "ExtRef" | "ExtIoRef" = node.tagName === "ExtRef" ? "ExtRef" : "ExtIoRef";

    if (!ref) {
      return mapNodeToJsx(node.childNodes);
    }

    const href = urlResolver ? urlResolver(name, "ref", ref, node) : ref;

    const handleExtRefClick = (event: MouseEvent) => {
      emitClick({
        type: name,
        node,
        originalEvent: event,
        isModifiedEvent: isModifiedEvent(event),
        href: href ?? undefined,
      });
    };

    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={href ?? undefined}
        class={className}
        title="Opent andere website in nieuw tabblad"
        onClick={handleExtRefClick}
      >
        <span>{mapNodeToJsx(node.childNodes)}</span>
        <dso-icon icon="external-link"></dso-icon>
      </a>
    );
  }
}
