import { EventEmitter } from "@stencil/core";
import { OzonContentNodeState } from "./ozon-content-node-state.interface";

import { OzonContentAnchorClick } from "./ozon-content.interfaces";

export interface OzonContentContext {
  state: OzonContentNodeState;
  setState(state: OzonContentNodeState): void;
  emitAnchorClick: EventEmitter<OzonContentAnchorClick>["emit"];
}
