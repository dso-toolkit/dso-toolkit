import { Fragment, h } from "@stencil/core";

import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentTextNode implements OzonContentNode {
  name = "#text";

  render({ textContent }: Node, { mark, emitMarkItemHighlight }: OzonContentNodeContext) {
    if (!mark || !textContent) {
      return <>{textContent}</>;
    }

    const result = mark(textContent);

    return !result || result.length === 0 ? (
      <>{textContent}</>
    ) : (
      <>
        {result.map((value) => {
          if (typeof value === "string") {
            return <>{value}</>;
          }

          return (
            <mark
              class={value.highlight ? "dso-highlight" : undefined}
              ref={(ref) => value.highlight && ref && emitMarkItemHighlight(value.text, ref)}
            >
              {value.text}
            </mark>
          );
        })}
      </>
    );
  }
}
