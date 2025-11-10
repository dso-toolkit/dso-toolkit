import { EventEmitter } from "@stencil/core";

import { MarkTextMarkFunction } from "../../functional-components/mark-text/mark-text.interfaces";

import { OzonContentNodeState } from "./ozon-content-node-state.interface";
import { OzonContentBegripResolver, OzonContentClickEvent, OzonContentUrlResolver } from "./ozon-content.interfaces";

export interface OzonContentContext {
  state: OzonContentNodeState;
  inline: boolean;
  mark: MarkTextMarkFunction | undefined;
  setState(state: OzonContentNodeState): void;
  emitClick: EventEmitter<OzonContentClickEvent>["emit"];
  emitMarkItemHighlight(text: string, ref: HTMLElement): void;
  urlResolver: OzonContentUrlResolver | undefined;
  begripResolver: OzonContentBegripResolver | undefined;
}
