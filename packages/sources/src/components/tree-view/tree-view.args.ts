import { HandlerFunction } from '@storybook/addon-actions';
import { ArgTypes } from '../../storybook';

export interface TreeViewArgs {
  onClickItem: HandlerFunction;
}

export const treeViewArgTypes: ArgTypes<TreeViewArgs> = {
  onClickItem: {
    action: 'clicked item'
  }
};
