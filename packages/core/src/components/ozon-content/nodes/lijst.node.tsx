import { h } from "@stencil/core";

import { getNodeName } from "../get-node-name.function";
import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentLijstNode implements OzonContentNode {
  name = "Lijst";

  render(node: Element, { mapNodeToJsx }: OzonContentNodeContext) {
    const childNodes = Array.from(node.childNodes);
    const aanhef = childNodes.find((n) => getNodeName(n) === "Lijstaanhef");
    const sluiting = childNodes.find((n) => getNodeName(n) === "Lijstsluiting");
    const listItems = childNodes.filter((n) => getNodeName(n) === "Li");

    return (
      <div class="dso-ozon-lijst od-Lijst">
        {aanhef && mapNodeToJsx(aanhef)}
        <ul class={node.getAttribute("type") ?? ""}>
          {listItems.map((item) => {
            const itemNodes = Array.from(item.childNodes);
            const liNummer = itemNodes.find((n) => getNodeName(n) === "LiNummer")?.childNodes;

            return (
              <li class="od-Li">
                {liNummer && <span class="od-LiNummer">{mapNodeToJsx(liNummer)}</span>}
                {mapNodeToJsx(itemNodes.filter((n) => getNodeName(n) !== "LiNummer"))}
              </li>
            );
          })}
        </ul>
        {sluiting && mapNodeToJsx(sluiting)}
      </div>
    );
  }
}
