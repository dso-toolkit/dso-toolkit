import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction } from "../../storybook";

import { MapLayer, MapLayerObject } from "./map-layer.models.js";

export interface MapLayerArgs {
  active: boolean;
  activatable: boolean;
  dsoActiveChange: HandlerFunction;
  dsoMouseEnter: HandlerFunction;
  dsoMouseLeave: HandlerFunction;
  label: string;
}

export const mapLayerArgs: MapLayerArgs = {
  label: "Map layer",
  active: false,
  activatable: true,
  dsoActiveChange: fn(),
  dsoMouseEnter: fn(),
  dsoMouseLeave: fn(),
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
  dsoMouseEnter: argTypeAction(),
  dsoMouseLeave: argTypeAction(),
};

export function mapLayerArgsMapper<TemplateFnReturnType>(
  a: MapLayerArgs,
  objects: MapLayerObject<TemplateFnReturnType>[],
): MapLayer<TemplateFnReturnType> {
  return {
    ...a,
    dsoActiveChange: (e) => a.dsoActiveChange(e.detail),
    objects: objects.map((o) => {
      return {
        ...o,
        dsoMouseEnter: () => a.dsoMouseEnter(),
        dsoMouseLeave: () => a.dsoMouseLeave(),
      };
    }),
  };
}
