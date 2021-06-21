import { MapControls as DsoLeafletMapControls } from '@dso-toolkit/leaflet';
import { createElementHook, useLeafletContext, LeafletProvider, LeafletContextInterface } from '@react-leaflet/core';
import { Layer } from 'leaflet';
import * as React from 'react';

import { MapControlsProvider, useMapControlsContext } from './map-controls.context';

export interface MapControlsProps {
  children?: React.ReactNode;
}

function createMapControls(props: MapControlsProps, ctx: LeafletContextInterface) {
  const instance = new DsoLeafletMapControls(undefined, undefined);

  return { instance, context: { ...ctx, mapControls: instance } };
}

export const useMapControlsElement = createElementHook<DsoLeafletMapControls, MapControlsProps>(createMapControls);

// @ts-ignore Trick Typescript a bit
export const MapControls: React.ForwardRefExoticComponent<
MapControlsProps & React.RefAttributes<MapControlsProps>
> & {
  BaseLayer: React.FunctionComponent<ControlledLayerProps>
  Overlay: React.FunctionComponent<ControlledLayerProps>
} = React.forwardRef<unknown, MapControlsProps>(function MapControls(props, ref) {
  const [mapControlsElement, setMapControlsElement] = React.useState<HTMLDivElement | undefined>();
  const leafletContext = useLeafletContext();
  const elementRef = useMapControlsElement(props, leafletContext);

  React.useEffect(() => {
    const { map } = leafletContext;
    elementRef.current.instance.addTo(map);
    setMapControlsElement(elementRef.current.instance.getContainer());

    return () => {
      elementRef.current.instance.remove();
      setMapControlsElement(undefined);
    };
  }, []);

  return props.children && mapControlsElement
    ? (
      <MapControlsProvider value={{ mapControls: elementRef.current.instance }}>{props.children}</MapControlsProvider>
    )
    : null;
});

export interface ControlledLayerProps {
  name: string
  checked?: boolean
  children: React.ReactNode
}

type AddLayerFunc = (
  mapControls: DsoLeafletMapControls,
  layer: Layer,
  name: string,
) => void;

export function createControlledLayer(addLayerToControl: AddLayerFunc) {
  return function ControlledLayer(props: ControlledLayerProps) {
    const parentContext = useLeafletContext();
    const propsRef = React.useRef(props);
    const [layer, setLayer] = React.useState<Layer | null>(null);
    const { mapControls } = useMapControlsContext();
    const { map } = parentContext;

    const addLayer = React.useCallback(
      (layerToAdd: Layer) => {
        if (mapControls) {
          if (propsRef.current.checked) {
            map.addLayer(layerToAdd);
          }

          addLayerToControl(mapControls, layerToAdd, propsRef.current.name);
          setLayer(layerToAdd);
        }
      },
      [mapControls, map]
    );

    const removeLayer = React.useCallback(
      (layerToRemove: Layer) => {
        mapControls?.removeLayer(layerToRemove);
        setLayer(null);
      },
      [mapControls]
    );

    const context = React.useMemo(
      () => ({ ...parentContext, layerContainer: { addLayer, removeLayer }}),
      [parentContext, addLayer, removeLayer]
    );

    React.useEffect(() => {
      if (layer !== null && propsRef.current !== props) {
        if (props.checked === true && (propsRef.current.checked == null || propsRef.current.checked === false)) {
          map.addLayer(layer);
        }
        else if (propsRef.current.checked === true && (props.checked == null || props.checked === false)) {
          map.removeLayer(layer);
        }

        propsRef.current = props;
      }
    });

    return props.children
      ? (
        <LeafletProvider value={context}>{props.children}</LeafletProvider>
      )
      : null;
  }
}

MapControls.BaseLayer = createControlledLayer(function addBaseLayer(
  mapControls: DsoLeafletMapControls,
  layer: Layer,
  name: string
) {
  mapControls.addBaseLayer(layer, name);
});

MapControls.Overlay = createControlledLayer(function addOverlay(
  mapControls: DsoLeafletMapControls,
  layer: Layer,
  name: string,
) {
  mapControls.addOverlay(layer, name);
});
