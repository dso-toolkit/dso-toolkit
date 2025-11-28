import { h } from "@stencil/core";

import { resolveUrlByNaam } from "../functions/resolve-url";
import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentInlineTekstAfbeeldingNode implements OzonContentNode {
  name = ["InlineTekstAfbeelding", "Illustratie"];

  render(node: Element, { urlResolver }: OzonContentNodeContext) {
    const value = node.getAttribute("naam") ?? "";
    const name: "InlineTekstAfbeelding" | "Illustratie" =
      node.tagName === "InlineTekstAfbeelding" ? "InlineTekstAfbeelding" : "Illustratie";
    const src = resolveUrlByNaam(name, value, node, urlResolver);

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
