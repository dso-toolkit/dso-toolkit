import { h } from "@stencil/core";

import { isModifiedEvent } from "../../../utils/is-modified-event";
import { parseXml } from "../../../utils/parse-xml";
import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentIntRefNode implements OzonContentNode {
  name = "IntRef";

  render(node: Element, { mapNodeToJsx, emitClick, begripResolver, urlResolver }: OzonContentNodeContext) {
    const ref = node.getAttribute("ref");

    if (!ref) {
      return mapNodeToJsx(node.childNodes);
    }

    const definitie = begripResolver?.(ref, node);

    if (definitie) {
      const definitieXMLDocument = typeof definitie === "string" ? parseXml(definitie) : definitie;

      if (!definitieXMLDocument?.childNodes[0]?.childNodes) {
        return mapNodeToJsx(node.childNodes);
      }

      const definitieChildNodes = Array.from(definitieXMLDocument.childNodes[0].childNodes);

      if (definitieChildNodes.length === 0) {
        return mapNodeToJsx(node.childNodes);
      }

      return (
        <dso-ozon-content-toggletip icon="info">
          <span slot="label">{mapNodeToJsx(node.childNodes)}</span>
          {mapNodeToJsx(definitieChildNodes)}
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

    const href = urlResolver ? urlResolver("IntRef", "ref", ref, node) : ref;

    return (
      <a href={href} onClick={handleIntRefClick}>
        {mapNodeToJsx(node.childNodes)}
      </a>
    );
  }
}
