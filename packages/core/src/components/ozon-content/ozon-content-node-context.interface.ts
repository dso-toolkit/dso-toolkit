import { JSX } from "@stencil/core";

import { OzonContentAnchorClickEvent } from "./ozon-content.interfaces";

export interface OzonContentNodeContext<T = unknown> {
  inline: boolean;
  path: Node[];
  mapNodeToJsx(node: Node | Node[] | NodeList): JSX.Element;
  emitAnchorClick(event: OzonContentAnchorClickEvent): void;
  state?: T;
  setState?(state: T): void;
}
