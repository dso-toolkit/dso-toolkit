import { HandlerFunction } from '@storybook/addon-actions';

import { ArgTypes } from '../../storybook';

import { baseLayers, overlays } from './map-controls.content';
import { MapControls } from './map-controls.models';

export interface MapControlsArgs {
  dsoZoomIn: HandlerFunction;
  dsoZoomOut: HandlerFunction;
  open: boolean;
  baseLayers: typeof baseLayers;
  dsoBaseLayerChange: HandlerFunction;
  overlays: typeof overlays;
  dsoToggleOverlay: HandlerFunction;
  disableZoom: 'both' | 'in' | 'out' | undefined;
}

export const mapControlsArgTypes: ArgTypes<MapControlsArgs> = {
  open: {
    type: 'boolean'
  },
  dsoZoomIn: {
    action: 'dsoZoomIn'
  },
  dsoZoomOut: {
    action: 'dsoZoomOut'
  },
  baseLayers: {
    control: {
      disable: true
    }
  },
  dsoBaseLayerChange: {
    action: 'dsoBaseLayerChange'
  },
  overlays: {
    control: {
      disable: true
    }
  },
  dsoToggleOverlay: {
    action: 'dsoToggleOverlay'
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

      a.dsoBaseLayerChange(e);
    },
    baseLayers: a.baseLayers,
    open: a.open,
    overlays: a.overlays,
    toggleOverlay: e => a.dsoToggleOverlay(e),
    zoomIn: e => a.dsoZoomIn(e),
    zoomOut: e => a.dsoZoomOut(e),
    disableZoom: a.disableZoom
  };
}
