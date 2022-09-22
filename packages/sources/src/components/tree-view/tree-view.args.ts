import { HandlerFunction } from '@storybook/addon-actions';
import { ArgTypes } from '../../storybook';

export interface TreeViewArgs {
  onDsoClickItem: HandlerFunction;
}

export const treeViewArgTypes: ArgTypes<TreeViewArgs> = {
  onDsoClickItem: {
    action: 'onDsoClickItem'
  }
};
