import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction } from "../../storybook";

import { MapLayer, MapLayerObject } from "./map-layer.models.js";

export interface MapLayerArgs {
  label: string;
  active: boolean;
  activatable: boolean;
  dsoActiveChange: HandlerFunction;
}

export const mapLayerArgs: MapLayerArgs = {
  label: "Map layer",
  active: false,
  activatable: true,
  dsoActiveChange: fn(),
};

export const mapLayerArgTypes: ArgTypes<MapLayerArgs> = {
  label: {
    control: {
      type: "text",
    },
  },
  active: {
    control: {
      type: "boolean",
    },
  },
  activatable: {
    control: {
      type: "boolean",
    },
  },
  dsoActiveChange: argTypeAction(),
};

export function mapLayerArgsMapper<TemplateFnReturnType>(
  a: MapLayerArgs,
  objects: MapLayerObject<TemplateFnReturnType>[],
): MapLayer<TemplateFnReturnType> {
  return {
    ...a,
    dsoActiveChange: (e) => a.dsoActiveChange(e.detail),
    objects,
  };
}
