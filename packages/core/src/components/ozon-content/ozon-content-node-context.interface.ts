import { JSX } from "@stencil/core";

import { MarkTextMarkFunction } from "../../functional-components/mark-text/mark-text.interfaces";

import { OzonContentBegripResolver, OzonContentClickEvent, OzonContentUrlResolver } from "./ozon-content.interfaces";

export interface OzonContentNodeContext<T = unknown> {
  inline: boolean;
  path: Node[];
  mark: MarkTextMarkFunction | undefined;
  mapNodeToJsx(node: Node | Node[] | NodeList, ignoreMark?: boolean): JSX.Element;
  emitClick(event: OzonContentClickEvent): void;
  state?: T;
  setState?(state: T): void;
  emitMarkItemHighlight(text: string, elementRef: HTMLElement): void;
  urlResolver: OzonContentUrlResolver | undefined;
  begripResolver: OzonContentBegripResolver | undefined;
  annotated: boolean;
}
