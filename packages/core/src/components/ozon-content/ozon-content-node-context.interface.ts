import { JSX } from "@stencil/core";

import {
  OzonContentAnchorClickEvent,
  OzonContentMarkFunction,
  OzonContentUrlResolver,
} from "./ozon-content.interfaces";

export interface OzonContentNodeContext<T = unknown> {
  inline: boolean;
  path: Node[];
  mark: OzonContentMarkFunction | undefined;
  mapNodeToJsx(node: Node | Node[] | NodeList): JSX.Element;
  emitAnchorClick(event: OzonContentAnchorClickEvent): void;
  state?: T;
  setState?(state: T): void;
  emitMarkItemHighlight(text: string, elementRef: HTMLElement): void;
  urlResolver: OzonContentUrlResolver | undefined;
}
