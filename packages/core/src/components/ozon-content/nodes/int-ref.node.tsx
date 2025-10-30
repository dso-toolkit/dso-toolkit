import { h } from "@stencil/core";

import { parseXml } from "../../../utils/parse-xml";
import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentIntRefNode implements OzonContentNode {
  name = "IntRef";

  render(node: Element, { mapNodeToJsx, emitClick, begripResolver, urlResolver }: OzonContentNodeContext) {
    const name = "IntRef" as const;
    const scope = node.getAttribute("scope");
    const value = node.getAttribute("ref");

    if (scope === "Begrip") {
      const definitie = begripResolver?.(name, "ref", value, node) ?? value;
      const definitieNode = typeof definitie === "string" ? parseXml(definitie) : definitie;

      return (
        <dso-ref-toggletip icon="info">
          <span slot="label">{mapNodeToJsx(node.childNodes)}</span>
          {definitieNode ? mapNodeToJsx(definitieNode) : null}
        </dso-ref-toggletip>
      );
    }

    const handleIntRefClick = (event: MouseEvent) => {
      emitClick({
        type: "IntRef",
        node,
        originalEvent: event,
      });
    };

    return (
      <a href={urlResolver?.("IntRef", "ref", value, node)} onClick={handleIntRefClick}>
        {mapNodeToJsx(node.childNodes)}
      </a>
    );
  }
}
