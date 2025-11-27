import { h } from "@stencil/core";

import { isModifiedEvent } from "../../../utils/is-modified-event";
import { parseXml } from "../../../utils/parse-xml";
import { resolveUrlByRef } from "../functions/resolve-url";
import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentIntRefNode implements OzonContentNode {
  name = "IntRef";

  render(node: Element, { mapNodeToJsx, emitClick, begripResolver, urlResolver }: OzonContentNodeContext) {
    const scope = node.getAttribute("scope");
    const value = node.getAttribute("ref");

    if (!value) {
      return mapNodeToJsx(node.childNodes);
    }

    if (scope === "Begrip") {
      const definitie = begripResolver ? begripResolver(value, node) : value;
      const definitieNode = typeof definitie === "string" ? parseXml(definitie) : definitie;

      return (
        <dso-ozon-content-toggletip icon="info">
          <span slot="label">{mapNodeToJsx(node.childNodes)}</span>
          {definitieNode ? mapNodeToJsx(definitieNode) : null}
        </dso-ozon-content-toggletip>
      );
    }

    const handleIntRefClick = (event: MouseEvent) => {
      emitClick({
        type: "IntRef",
        node,
        originalEvent: event,
        isModifiedEvent: isModifiedEvent(event),
      });
    };

    const href = resolveUrlByRef("IntRef", value, node, urlResolver);

    return (
      <a href={href} onClick={handleIntRefClick}>
        {mapNodeToJsx(node.childNodes)}
      </a>
    );
  }
}
