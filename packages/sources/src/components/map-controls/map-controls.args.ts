import { HandlerFunction } from '@storybook/addon-actions';

import { ArgTypes } from '../../stories-helpers';

import { baseLayers, overlays, selectedBaseLayer } from './map-controls.content';
import { MapControls } from './map-controls.models';

export interface MapControlsArgs {
  zoomIn: HandlerFunction;
  zoomOut: HandlerFunction;
  open: boolean;
  baseLayers: typeof baseLayers;
  selectedBaseLayer: typeof selectedBaseLayer;
  baseLayerChange: HandlerFunction;
  overlays: typeof overlays;
  checkedOverlays: typeof overlays[0] | string[] | undefined;
  checkedOverlaysChange: HandlerFunction;
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
  selectedBaseLayer: {
    options: baseLayers.map(b => b.id),
    mapping: baseLayers.reduce((map, layer) => Object.assign(map, { [layer.id]: layer }), {}),
    control: {
      type: 'select'
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
  checkedOverlays: {
    options: overlays.map(o => o.id),
    mapping: overlays.reduce((map, overlay) => Object.assign(map, { [overlay.id]: overlay }), {}),
    control: {
      type: 'check'
    }
  },
  checkedOverlaysChange: {
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
    baseLayerChange: e => a.baseLayerChange(e),
    baseLayers: a.baseLayers,
    checkedOverlays: a.checkedOverlays,
    checkedOverlaysChange: e => a.checkedOverlaysChange(e),
    open: a.open,
    overlays: a.overlays,
    selectedBaseLayer: a.selectedBaseLayer,
    zoomIn: e => a.zoomIn(e),
    zoomOut: e => a.zoomOut(e),
    disableZoom: a.disableZoom
  };
}
