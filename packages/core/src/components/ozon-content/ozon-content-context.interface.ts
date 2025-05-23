import { EventEmitter } from "@stencil/core";

import {
  OzonContentAnchorClickEvent,
  OzonContentMarkFunction,
  OzonContentUrlResolver,
} from "./ozon-content.interfaces";
import { OzonContentNodeState } from "./ozon-content-node-state.interface";

export interface OzonContentContext {
  state: OzonContentNodeState;
  inline: boolean;
  mark: OzonContentMarkFunction | undefined;
  setState(state: OzonContentNodeState): void;
  emitAnchorClick: EventEmitter<OzonContentAnchorClickEvent>["emit"];
  emitMarkItemHighlight(text: string, ref: HTMLElement): void;
  urlResolver: OzonContentUrlResolver | undefined;
}
