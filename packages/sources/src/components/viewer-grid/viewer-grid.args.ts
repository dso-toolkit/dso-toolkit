import { HandlerFunction } from '@storybook/addon-actions';

import { ArgTypes } from '../../stories-helpers';

import { ViewerGridDemoProperties } from './viewer-grid.models';

export interface ViewerGridArgs {
  panelSize: 'small' | 'medium' | 'large';
  panelOpen: boolean;
  shrink: HandlerFunction;
  expand: HandlerFunction;
  closeOverlay: HandlerFunction;
}

export const viewerGridArgTypes: ArgTypes<ViewerGridArgs> = {
  panelSize: {
    options: ['small', 'medium', 'large'],
    control: {
      type: 'select'
    }
  },
  panelOpen: {
    control: {
      type: 'boolean'
    }
  },
  shrink: {
    action: 'shrink'
  },
  expand: {
    action: 'expand'
  },
  closeOverlay: {
    action: 'closeAside'
  }
};

export function viewerGridDemoArgsMapper(a: ViewerGridArgs): ViewerGridDemoProperties {
  return {
    ...a
  };
}
