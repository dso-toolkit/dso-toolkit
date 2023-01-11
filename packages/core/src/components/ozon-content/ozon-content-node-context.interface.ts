import { JSX } from "@stencil/core";

import { OzonContentAnchorClick } from "./ozon-content.interfaces";

export interface OzonContentNodeContext<T = unknown> {
  path: Node[];
  mapNodeToJsx(node: Node | Node[] | NodeList): JSX.Element;
  emitAnchorClick(event: OzonContentAnchorClick): void;
  state?: T;
  setState?(state: T): void;
}
