import { EventEmitter } from '@stencil/core';

import { OzonContentAnchorClick } from './ozon-content.interfaces';

export interface OzonContentContext {
  state: { [nodeId: string]: any };
  setState(state: { [nodeId: string]: unknown }): void;
  emitAnchorClick: EventEmitter<OzonContentAnchorClick>['emit'];
}
