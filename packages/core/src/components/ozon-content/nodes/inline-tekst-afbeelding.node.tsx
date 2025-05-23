import { h } from "@stencil/core";

import { OzonContentNode } from "../ozon-content-node.interface";
import { OzonContentNodeContext } from "../ozon-content-node-context.interface";

export class OzonContentInlineTekstAfbeeldingNode implements OzonContentNode {
  name = ["InlineTekstAfbeelding", "Illustratie"];

  render(node: Element, { urlResolver }: OzonContentNodeContext) {
    const value = node.getAttribute("naam");
    const name: "InlineTekstAfbeelding" | "Illustratie" =
      node.tagName === "InlineTekstAfbeelding" ? "InlineTekstAfbeelding" : "Illustratie";
    const src = urlResolver ? urlResolver(name, "naam", value, node) : value;

    return (
      <img
        src={src ?? undefined}
        alt={node.getAttribute("naam") ?? undefined}
        height={node.getAttribute("hoogte") ?? undefined}
        width={node.getAttribute("breedte") ?? undefined}
      />
    );
  }
}
