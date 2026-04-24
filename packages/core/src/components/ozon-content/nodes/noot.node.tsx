import { Fragment, h } from "@stencil/core";

import { getNodeName } from "../get-node-name.function";
import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentNootNode implements OzonContentNode {
  name = "Noot";

  handles = ["NootNummer"];

  identify(): string | undefined {
    return "Noot";
  }

  render(node: Element, { mapNodeToJsx }: OzonContentNodeContext<string | undefined>) {
    const noteId = node.getAttribute("id");
    if (!noteId) {
      console.error("Noot node without id", node);

      return <Fragment />;
    }

    const childNodes = Array.from(node.childNodes);
    const nootNummer = childNodes.find((n) => getNodeName(n) === "NootNummer")?.textContent ?? noteId;

    return (
      <Fragment>
        <sup>
          <dso-ozon-content-toggletip class="toggle-note">
            <span slot="label">{nootNummer}</span>
            <span role="section">{mapNodeToJsx(Array.from(node.querySelectorAll(":scope > Al")))}</span>
          </dso-ozon-content-toggletip>
        </sup>
      </Fragment>
    );
  }
}
