import { HandlerFunction } from '@storybook/addon-actions';

import { ArgTypes } from '../../storybook';

export interface ResponsiveElementArgs {
  onSizeChange: HandlerFunction;
}

export const responsiveElementArgTypes: ArgTypes<ResponsiveElementArgs> = {
  onSizeChange: {
    action: 'onSizeChange',
  },
};
