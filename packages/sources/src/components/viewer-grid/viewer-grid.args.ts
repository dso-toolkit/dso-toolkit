import { HandlerFunction } from '@storybook/addon-actions';

import { ArgTypes } from '../../stories-helpers';

import { ViewerGridDemoProperties } from './viewer-grid.models';

export interface ViewerGridArgs {
  panelSize: 'small' | 'medium' | 'large';
  panelOpen: boolean;
  shrink: HandlerFunction;
  expand: HandlerFunction;
  closeOverlay: HandlerFunction;
  documentHeaderFeaturesOpen: boolean;
  documentHeaderMapAction: HandlerFunction;
  documentHeaderFeatureAction: HandlerFunction;
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
  documentHeaderFeaturesOpen: {
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
  },
  documentHeaderMapAction: {
    action: 'documentHeaderMapAction'
  },
  documentHeaderFeatureAction: {
    action: 'documentHeaderFeatureAction'
  }
};

export function viewerGridDemoArgsMapper(a: ViewerGridArgs): ViewerGridDemoProperties {
  return {
    ...a
  };
}
