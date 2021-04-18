import { LayersPanelControl } from './layers-panel.control';
import { LayersPanelOptions } from './layers-panel.options';

export const layersPanel = function (baseLayers: any, overlays: any, options?: LayersPanelOptions) {
  const instance = new LayersPanelControl(baseLayers, overlays, options);

  return instance;
};
