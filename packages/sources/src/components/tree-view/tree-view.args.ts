import { HandlerFunction } from '@storybook/addon-actions';
import { ArgTypes } from '../../storybook';

export interface TreeViewArgs {
  dsoClickItem: HandlerFunction;
}

export const treeViewArgTypes: ArgTypes<TreeViewArgs> = {
  dsoClickItem: {
    action: 'onDsoClickItem'
  }
};
