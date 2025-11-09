import { Fragment, h } from "@stencil/core";

import { MarkText } from "../functional-components/mark-text.functional-component";
import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentTextNode implements OzonContentNode {
  name = "#text";

  render({ textContent }: Node, { mark, emitMarkItemHighlight }: OzonContentNodeContext) {
    if (!mark || !textContent) {
      return <Fragment>{textContent}</Fragment>;
    }

    return <MarkText mark={mark} text={textContent} emitMarkItemHighlight={emitMarkItemHighlight} />;
  }
}
