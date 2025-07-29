import { h } from "@stencil/core";

import { inputToXmlDocument } from "../functions/input-to-xml-document.function";
import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentIntRefNode implements OzonContentNode {
  name = "IntRef";

  render(node: Element, { mapNodeToJsx, emitClick, begripResolver }: OzonContentNodeContext) {
    const name = "IntRef" as const;
    const scope = node.getAttribute("scope");
    const value = node.getAttribute("ref");

    if (scope === "Begrip") {
      const begrip = begripResolver ? begripResolver(name, "ref", value, node) : value;

      return (
        begrip && (
          <dso-ref-toggletip icon="info">
            <span slot="label">{mapNodeToJsx(node.childNodes)}</span>
            {mapNodeToJsx(inputToXmlDocument(begrip, new DOMParser()))}
          </dso-ref-toggletip>
        )
      );
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
      <a href={`#${value}`} onClick={handleIntRefClick}>
        {mapNodeToJsx(node.childNodes)}
      </a>
    );
  }
}
