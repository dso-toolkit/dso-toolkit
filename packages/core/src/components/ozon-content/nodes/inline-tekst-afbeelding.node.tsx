import { h } from "@stencil/core";

import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentInlineTekstAfbeeldingNode implements OzonContentNode {
  name = ["InlineTekstAfbeelding", "Illustratie"];

  render(node: Element) {
    return (
      <img
        src={node.getAttribute("naam") ?? undefined}
        alt={node.getAttribute("naam") ?? undefined}
        height={node.getAttribute("hoogte") ?? undefined}
        width={node.getAttribute("breedte") ?? undefined}
      />
    );
  }
}
