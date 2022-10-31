import { createContext, useContext } from "react";
import { MapControls } from "@dso-toolkit/leaflet";

export interface Context {
  mapControls: MapControls;
}

export const MapControlsContext = createContext<Context | null>(null);

export const MapControlsProvider = MapControlsContext.Provider;

export function useMapControlsContext() {
  const context = useContext(MapControlsContext);
  if (!context) {
    throw new Error("No context provided: useMapControlsContext() can only be used in a descendant of <MapControls>");
  }

  return context;
}
