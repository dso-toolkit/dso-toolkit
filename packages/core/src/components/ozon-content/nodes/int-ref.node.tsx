import { h } from "@stencil/core";

import { isModifiedEvent } from "../../../utils/is-modified-event";
import { parseXml } from "../../../utils/parse-xml";
import { resolveUrlByRef } from "../functions/resolve-url";
import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentIntRefNode implements OzonContentNode {
  name = "IntRef";

  render(node: Element, nodeContext: OzonContentNodeContext) {
    const { mapNodeToJsx, emitClick, begripResolver, urlResolver } = nodeContext;
    const ref = node.getAttribute("ref");

    if (!ref) {
      return mapNodeToJsx(node.childNodes);
    }

    const definitie = begripResolver?.(ref, node);

    if (definitie) {
      const definitieXMLDocument = typeof definitie === "string" ? parseXml(definitie) : definitie;

      if (
        !definitieXMLDocument ||
        definitieXMLDocument.childNodes.length === 0 ||
        !definitieXMLDocument.childNodes[0]?.childNodes
      ) {
        return mapNodeToJsx(node.childNodes);
      }

      return (
        <dso-ozon-content-toggletip icon="info">
          <span slot="label">{mapNodeToJsx(node.childNodes)}</span>
          {mapNodeToJsx(definitieXMLDocument.childNodes[0].childNodes)}
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

    const href = resolveUrlByRef("IntRef", ref, node, urlResolver);

    return (
      <a href={href} onClick={handleIntRefClick}>
        {mapNodeToJsx(node.childNodes)}
      </a>
    );
  }
}
