import { h } from "@stencil/core";

import { parseWijzigactieFromNode } from "../functions/parse-wijzigactie-from-node.function";
import { wijzigactieToClassName } from "../functions/wijzigactie-to-class-name.function";
import { getNodeName } from "../get-node-name.function";
import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentBegripNode implements OzonContentNode {
  name = "Begrip";

  render(node: Element, { mapNodeToJsx }: OzonContentNodeContext) {
    const wijzigactie = parseWijzigactieFromNode(node);
    const className = wijzigactieToClassName(wijzigactie);

    const childNodes = Array.from(node.childNodes);
    const terms = childNodes.filter((n) => getNodeName(n) === "Term");
    const definitions = childNodes.filter((n) => getNodeName(n) === "Definitie");

    return (
      <div class={className}>
        {terms && terms.map((term) => mapNodeToJsx(term))}
        {definitions && definitions.map((definition) => mapNodeToJsx(definition))}
      </div>
    );
  }
}
