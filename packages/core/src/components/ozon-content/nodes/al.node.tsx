import { h } from "@stencil/core";

import { WrapWijzigactie } from "../functional-components/wrap-wijzigactie.functional-component";
import { parseWijzigactieFromNode } from "../functions/parse-wijzigactie-from-node.function";
import { wijzigactieToClassName } from "../functions/wijzigactie-to-class-name.function";
import { getNodeName } from "../get-node-name.function";
import { OzonContentNode } from "../ozon-content-node.interface";
import { OzonContentNodeContext } from "../ozon-content-node-context.interface";

function isNestedAl(path: Node[]) {
  return path.some((n) => {
    const nodeName = getNodeName(n);

    return nodeName === "Al" || nodeName === "Opschrift";
  });
}

export class OzonContentAlNode implements OzonContentNode {
  name = "Al";

  render(node: Element, { mapNodeToJsx, path, inline }: OzonContentNodeContext) {
    let content = mapNodeToJsx(node.childNodes);
    const wijzigactie = parseWijzigactieFromNode(node);
    const className = wijzigactieToClassName(wijzigactie);

    if (inline || isNestedAl(path)) {
      content = (
        <span role="paragraph" class={className}>
          {content}
        </span>
      );
    } else {
      content = <p class={className}>{content}</p>;
    }

    return <WrapWijzigactie wijzigactie={wijzigactie}>{content}</WrapWijzigactie>;
  }
}
