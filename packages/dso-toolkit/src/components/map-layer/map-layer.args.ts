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
  wijzigactie: "voegtoe" | "verwijder" | "undefined";
  objectWijzigactie: "voegtoe" | "verwijder" | "undefined";
}

export const mapLayerArgs: MapLayerArgs = {
  active: false,
  activatable: true,
  dsoActiveChange: fn(),
  dsoMouseEnter: fn(),
  dsoMouseLeave: fn(),
  wijzigactie: "undefined",
  objectWijzigactie: "undefined",
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
    options: ["undefined", "voegtoe", "verwijder"],
  },
  objectWijzigactie: {
    control: {
      type: "select",
    },
    options: ["undefined", "voegtoe", "verwijder"],
  },
  dsoActiveChange: argTypeAction(),
  dsoMouseEnter: argTypeAction(),
  dsoMouseLeave: argTypeAction(),
};

export function mapLayerArgsMapper<TemplateFnReturnType>(
  a: MapLayerArgs,
  objects: MapLayerObject<TemplateFnReturnType>[],
): Omit<MapLayer<TemplateFnReturnType>, "nameSlot"> {
  return {
    ...a,
    wijzigactie: a.wijzigactie === "undefined" ? undefined : a.wijzigactie,
    dsoActiveChange: (e) => a.dsoActiveChange(e.detail),
    objects: objects.map((o) => {
      return {
        ...o,
        wijzigactie: a.objectWijzigactie === "undefined" ? undefined : a.objectWijzigactie,
        dsoMouseEnter: () => a.dsoMouseEnter(),
        dsoMouseLeave: () => a.dsoMouseLeave(),
      };
    }),
  };
}
