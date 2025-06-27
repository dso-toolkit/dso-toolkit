import { EventEmitter } from "@stencil/core";

import { OzonContentNodeState } from "./ozon-content-node-state.interface";
import {
  OzonContentAnchorClickEvent,
  OzonContentClickEvent,
  OzonContentMarkFunction,
  OzonContentUrlResolver,
} from "./ozon-content.interfaces";

export interface OzonContentContext {
  state: OzonContentNodeState;
  inline: boolean;
  mark: OzonContentMarkFunction | undefined;
  setState(state: OzonContentNodeState): void;
  emitAnchorClick: EventEmitter<OzonContentAnchorClickEvent>["emit"];
  emitClick: EventEmitter<OzonContentClickEvent>["emit"];
  emitMarkItemHighlight(text: string, ref: HTMLElement): void;
  urlResolver: OzonContentUrlResolver | undefined;
}
