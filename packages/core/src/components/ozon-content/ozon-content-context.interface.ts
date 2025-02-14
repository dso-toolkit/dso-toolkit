import { EventEmitter } from "@stencil/core";
import { OzonContentNodeState } from "./ozon-content-node-state.interface";

import { OzonContentAnchorClickEvent, OzonContentMarkFunction } from "./ozon-content.interfaces";

export interface OzonContentContext {
  state: OzonContentNodeState;
  addSpaceAfterNode: boolean;
  inline: boolean;
  mark: OzonContentMarkFunction | undefined;
  setState(state: OzonContentNodeState): void;
  emitAnchorClick: EventEmitter<OzonContentAnchorClickEvent>["emit"];
  emitMarkItemHighlight(text: string, ref: HTMLElement): void;
}
