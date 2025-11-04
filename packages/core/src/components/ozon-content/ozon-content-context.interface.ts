import { EventEmitter } from "@stencil/core";

import { OzonContentNodeState } from "./ozon-content-node-state.interface";
import {
  OzonContentBegripResolver,
  OzonContentClickEvent,
  OzonContentMarkFunction,
  OzonContentUrlResolver,
} from "./ozon-content.interfaces";

export interface OzonContentContext {
  state: OzonContentNodeState;
  inline: boolean;
  mark: OzonContentMarkFunction | undefined;
  setState(state: OzonContentNodeState): void;
  emitClick: EventEmitter<OzonContentClickEvent>["emit"];
  emitMarkItemHighlight(text: string, ref: HTMLElement): void;
  urlResolver: OzonContentUrlResolver | undefined;
  begripResolver: OzonContentBegripResolver | undefined;
}
