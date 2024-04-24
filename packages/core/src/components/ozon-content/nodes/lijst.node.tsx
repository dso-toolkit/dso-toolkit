import { h } from "@stencil/core";

import { getNodeName } from "../get-node-name.function";
import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";
import { parseWijzigactieFromNode } from "../functions/parse-wijzigactie-from-node.function";
import clsx from "clsx";
import { wijzigactieToClassName } from "../functions/wijzigactie-to-class-name.function";
import { WrapWijzigactie } from "../functional-components/wrap-wijzigactie.functional-component";

export class OzonContentLijstNode implements OzonContentNode {
  name = "Lijst";

  render(node: Element, { mapNodeToJsx }: OzonContentNodeContext) {
    const wijzigactie = parseWijzigactieFromNode(node);
    const childNodes = Array.from(node.childNodes);
    const type = parseTypeFromLijstNode(node);
    const aanhef = childNodes.find((n) => getNodeName(n) === "Lijstaanhef");
    const sluiting = childNodes.find((n) => getNodeName(n) === "Lijstsluiting");
    const listItems = childNodes.filter((n) => getNodeName(n) === "Li");

    return (
      <WrapWijzigactie wijzigactie={wijzigactie}>
        <div class={clsx("dso-ozon-lijst od-Lijst", wijzigactieToClassName(wijzigactie))}>
          {aanhef && mapNodeToJsx(aanhef)}
          <ul class={type}>
            {listItems.map((item) => {
              const itemNodes = Array.from(item.childNodes);
              const liNummer = itemNodes.find((n) => getNodeName(n) === "LiNummer")?.childNodes;
              const liWijzigactie = parseWijzigactieFromNode(item);

              return (
                <li class={clsx("od-Li", wijzigactieToClassName(liWijzigactie))}>
                  {liNummer && <span class="od-LiNummer">{mapNodeToJsx(liNummer)}</span>}
                  <WrapWijzigactie wijzigactie={liWijzigactie}>
                    {mapNodeToJsx(itemNodes.filter((n) => getNodeName(n) !== "LiNummer"))}
                  </WrapWijzigactie>
                </li>
              );
            })}
          </ul>
          {sluiting && mapNodeToJsx(sluiting)}
        </div>
      </WrapWijzigactie>
    );
  }
}

function parseTypeFromLijstNode(node: Node): LijstType | undefined {
  const type = node instanceof Element ? node.getAttribute("type") : undefined;

  return type === "expliciet" || type === "ongemarkeerd" ? type : undefined;
}

type LijstType = "expliciet" | "ongemarkeerd";
