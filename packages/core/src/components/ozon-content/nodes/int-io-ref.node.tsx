import { h } from "@stencil/core";

import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentIntIoRefNode implements OzonContentNode {
  name = "IntIoRef";

  render(node: Element, { mapNodeToJsx, emitAnchorClick }: OzonContentNodeContext) {
    const ref = node.getAttribute("ref");
    if (!ref) {
      return mapNodeToJsx(node.childNodes);
    }

    const intRefOnClick = (event: MouseEvent) => {
      event.preventDefault();

      const target = event.currentTarget;
      if (!(target instanceof HTMLAnchorElement)) {
        return;
      }

      const { href } = target;

      emitAnchorClick({
        node: this.name,
        href,
        documentComponent: ref,
        originalEvent: event,
      });
    };

    return (
      <a href={`#${ref}`} onClick={intRefOnClick}>
        {mapNodeToJsx(node.childNodes)}
      </a>
    );
  }
}
