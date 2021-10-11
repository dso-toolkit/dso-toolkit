import { HandlerFunction } from '@storybook/addon-actions';
import { ArgTypes } from '../../stories-helpers';

import { OzonContent } from './ozon-content.models';

export interface OzonContentArgs {
  content: string;
  onAnchorClick: HandlerFunction;
}

export const ozonContentArgTypes: ArgTypes<OzonContentArgs> = {
  content: {
    control: {
      type: 'text'
    }
  },
  onAnchorClick: {
    action: 'anchorClick'
  }
};

export function ozonContentArgsMapper(a: OzonContentArgs): OzonContent {
  return {
    content: a.content,
    onAnchorClick: (e: any) => a.onAnchorClick(e.detail)
  };
}
