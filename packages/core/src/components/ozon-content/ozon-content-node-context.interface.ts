import { JSX } from "@stencil/core";

import {
  OzonContentBegripResolver,
  OzonContentClickEvent,
  OzonContentMarkFunction,
  OzonContentUrlResolver,
} from "./ozon-content.interfaces";

export interface OzonContentNodeContext<T = unknown> {
  inline: boolean;
  path: Node[];
  mark: OzonContentMarkFunction | undefined;
  mapNodeToJsx(node: Node | Node[] | NodeList): JSX.Element;
  emitClick(event: OzonContentClickEvent): void;
  state?: T;
  setState?(state: T): void;
  emitMarkItemHighlight(text: string, elementRef: HTMLElement): void;
  urlResolver: OzonContentUrlResolver | undefined;
  begripResolver: OzonContentBegripResolver | undefined;
}
