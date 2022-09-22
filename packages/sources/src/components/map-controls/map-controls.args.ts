import { HandlerFunction } from '@storybook/addon-actions';

import { ArgTypes } from '../../storybook';

import { baseLayers, overlays } from './map-controls.content';
import { MapControls } from './map-controls.models';

export interface MapControlsArgs {
  onDsoZoomIn: HandlerFunction;
  onDsoZoomOut: HandlerFunction;
  open: boolean;
  baseLayers: typeof baseLayers;
  onDsoBaseLayerChange: HandlerFunction;
  overlays: typeof overlays;
  onDsoToggleOverlay: HandlerFunction;
  disableZoom: 'both' | 'in' | 'out' | undefined;
}

export const mapControlsArgTypes: ArgTypes<MapControlsArgs> = {
  open: {
    type: 'boolean'
  },
  onDsoZoomIn: {
    action: 'onDsoZoomIn'
  },
  onDsoZoomOut: {
    action: 'onDsoZoomOut'
  },
  baseLayers: {
    control: {
      disable: true
    }
  },
  onDsoBaseLayerChange: {
    action: 'onDsoBaseLayerChange'
  },
  overlays: {
    control: {
      disable: true
    }
  },
  onDsoToggleOverlay: {
    action: 'onDsoToggleOverlay'
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

      a.onDsoBaseLayerChange(e);
    },
    baseLayers: a.baseLayers,
    open: a.open,
    overlays: a.overlays,
    toggleOverlay: e => a.onDsoToggleOverlay(e),
    zoomIn: e => a.onDsoZoomIn(e),
    zoomOut: e => a.onDsoZoomOut(e),
    disableZoom: a.disableZoom
  };
}
