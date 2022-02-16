import { HandlerFunction } from '@storybook/addon-actions';

import { ArgTypes } from '../../stories-helpers';

import { baseLayers, overlays } from './map-controls.content';
import { MapControls } from './map-controls.models';

export interface MapControlsArgs {
  zoomIn: HandlerFunction;
  zoomOut: HandlerFunction;
  open: boolean;
  baseLayers: typeof baseLayers;
  baseLayerChange: HandlerFunction;
  overlays: typeof overlays;
  toggleOverlay: HandlerFunction;
  disableZoom: 'both' | 'in' | 'out' | undefined;
}

export const mapControlsArgTypes: ArgTypes<MapControlsArgs> = {
  open: {
    type: 'boolean'
  },
  zoomIn: {
    action: 'zoomIn'
  },
  zoomOut: {
    action: 'zoomOut'
  },
  baseLayers: {
    control: {
      disable: true
    }
  },
  baseLayerChange: {
    action: 'baseLayerChange'
  },
  overlays: {
    control: {
      disable: true
    }
  },
  toggleOverlay: {
    action: 'checkedOverlaysChange'
  },
  disableZoom: {
    options: ['both', 'in', 'out', undefined],
    control: {
      type: 'select'
    }
  }
};

export function mapControlsArgsMapper(a: MapControlsArgs): MapControls {
  return {
    baseLayerChange: (e: any) => {
      e.target!.baseLayers = [...e.target.baseLayers.map((l: any) => l.checked !== (l === e.detail.activeBaseLayer) ? { ...l, checked: l === e.detail.activeBaseLayer } : l)];

      a.baseLayerChange(e);
    },
    baseLayers: a.baseLayers,
    open: a.open,
    overlays: a.overlays,
    toggleOverlay: e => a.toggleOverlay(e),
    zoomIn: e => a.zoomIn(e),
    zoomOut: e => a.zoomOut(e),
    disableZoom: a.disableZoom
  };
}
