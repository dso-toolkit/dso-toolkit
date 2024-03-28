import { h } from "@stencil/core";

import { getNodeName } from "../get-node-name.function";
import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";
import clsx from "clsx";

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
    const wijzigactie = node.getAttribute("wijzigactie");

    const className =
      clsx({ "editaction-add": wijzigactie === "voegtoe", "editaction-remove": wijzigactie === "verwijder" }) ||
      undefined;

    if (inline || isNestedAl(path)) {
      content = (
        <span role="paragraph" class={className}>
          {content}
        </span>
      );
    } else {
      content = <p class={className}>{content}</p>;
    }

    if (wijzigactie === "voegtoe") {
      content = <ins>{content}</ins>;
    } else if (wijzigactie === "verwijder") {
      content = <del>{content}</del>;
    }

    return content;
  }
}
