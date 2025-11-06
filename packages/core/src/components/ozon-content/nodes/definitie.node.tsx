import { h } from "@stencil/core";

import { WrapWijzigactie } from "../functional-components/wrap-wijzigactie.functional-component";
import { parseWijzigactieFromNode } from "../functions/parse-wijzigactie-from-node.function";
import { wijzigactieToClassName } from "../functions/wijzigactie-to-class-name.function";
import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentDefinitieNode implements OzonContentNode {
  name = "Definitie";

  render(node: Element, { mapNodeToJsx }: OzonContentNodeContext) {
    const content = mapNodeToJsx(node.childNodes);
    const wijzigactie = parseWijzigactieFromNode(node);
    const className = wijzigactieToClassName(wijzigactie);

    return (
      <dd class={className}>
        <WrapWijzigactie wijzigactie={wijzigactie}>{content}</WrapWijzigactie>
      </dd>
    );
  }
}
