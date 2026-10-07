import { h } from "@stencil/core";

import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentInlineTekstAfbeeldingNode implements OzonContentNode {
  name = ["InlineTekstAfbeelding", "Illustratie"];

  render(node: Element, { urlResolver }: OzonContentNodeContext) {
    const naam = node.getAttribute("naam");
    const name: "InlineTekstAfbeelding" | "Illustratie" =
      node.tagName === "InlineTekstAfbeelding" ? "InlineTekstAfbeelding" : "Illustratie";
    const src = urlResolver && naam ? urlResolver(name, "naam", naam, node) : naam;

    return (
      <img
        src={src ?? undefined}
        alt={naam ?? undefined}
        height={node.getAttribute("hoogte") ?? undefined}
        width={node.getAttribute("breedte") ?? undefined}
      />
    );
  }
}
