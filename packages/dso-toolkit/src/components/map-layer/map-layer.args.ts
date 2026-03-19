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
  wijzigactie?: "voegtoe" | "verwijder";
  objectWijzigactie?: "voegtoe" | "verwijder";
}

export const mapLayerArgs: MapLayerArgs = {
  active: false,
  activatable: true,
  dsoActiveChange: fn(),
  dsoMouseEnter: fn(),
  dsoMouseLeave: fn(),
};

export const mapLayerArgTypes: ArgTypes<MapLayerArgs> = {
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
  wijzigactie: {
    control: {
      type: "select",
    },
    options: [undefined, "voegtoe", "verwijder"],
  },
  objectWijzigactie: {
    control: {
      type: "select",
    },
    options: [undefined, "voegtoe", "verwijder"],
  },
  dsoActiveChange: argTypeAction(),
  dsoMouseEnter: argTypeAction(),
  dsoMouseLeave: argTypeAction(),
};

export function mapLayerArgsMapper<TemplateFnReturnType>(
  a: MapLayerArgs,
  objects: MapLayerObject<TemplateFnReturnType>[],
  nameSlot: TemplateFnReturnType,
  labelSlot?: TemplateFnReturnType,
): MapLayer<TemplateFnReturnType> {
  return {
    ...a,
    nameSlot,
    labelSlot,
    wijzigactie: a.wijzigactie,
    dsoActiveChange: (e) => a.dsoActiveChange(e.detail),
    objects: objects.map((o) => {
      return {
        ...o,
        wijzigactie: a.objectWijzigactie,
        dsoMouseEnter: () => a.dsoMouseEnter(),
        dsoMouseLeave: () => a.dsoMouseLeave(),
      };
    }),
  };
}
