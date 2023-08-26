import { EventEmitter } from "@stencil/core";
import { OzonContentNodeState } from "./ozon-content-node-state.interface";

import { OzonContentAnchorClickEvent } from "./ozon-content.interfaces";

export interface OzonContentContext {
  state: OzonContentNodeState;
  inline: boolean;
  setState(state: OzonContentNodeState): void;
  emitAnchorClick: EventEmitter<OzonContentAnchorClickEvent>["emit"];
}
