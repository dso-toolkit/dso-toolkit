import { h } from "@stencil/core";

import { WrapWijzigactie } from "../../../functional-components/wrap-wijzigactie/wrap-wijzigactie.functional-component";
import { getEIdFromNode } from "../functions/get-eid-from-node.function";
import { parseWijzigactieFromNode } from "../functions/parse-wijzigactie-from-node.function";
import { wijzigactieToClassName } from "../functions/wijzigactie-to-class-name.function";
import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentBegrippenlijstNode implements OzonContentNode {
  name = "Begrippenlijst";

  render(node: Element, { mapNodeToJsx }: OzonContentNodeContext, ignoreMark?: boolean) {
    const content = mapNodeToJsx(node.childNodes);
    const wijzigactie = parseWijzigactieFromNode(node);
    const className = wijzigactieToClassName(wijzigactie);

    return (
      <div id={getEIdFromNode(node, ignoreMark)} class="begrippenlijst">
        <WrapWijzigactie wijzigactie={wijzigactie}>
          <dl class={className}>{content}</dl>
        </WrapWijzigactie>
      </div>
    );
  }
}
