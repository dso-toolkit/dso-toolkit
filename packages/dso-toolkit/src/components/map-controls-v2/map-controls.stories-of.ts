import { Addon_DecoratorFunction } from "@storybook/types";
import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

import { mapControlsArgsMapper, mapControlsArgTypes, MapControlsArgs } from "./map-controls.args.js";
import { baseLayers, overlays } from "./map-controls.content.js";
import { MapControlsV2 } from "./map-controls.models.js";

export interface MapControlsV2Templates<TemplateFnReturnType> {
  mapControlsV2Template: (mapControlsProperties: MapControlsV2) => TemplateFnReturnType;
}

export interface MapControlsV2Parameters<TemplateFnReturnType> {
  decorator: Addon_DecoratorFunction<TemplateFnReturnType>;
}

export function storiesOfMapControlsV2<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    MapControlsV2Templates<TemplateFnReturnType>
  >,
  { decorator }: MapControlsV2Parameters<TemplateFnReturnType>
) {
  return storiesOfFactory("Map Controls V2", storiesOfArguments, (stories, templateMapper) => {
    stories
      .addParameters({
        argTypes: mapControlsArgTypes,
        args: {
          identifier: "map-controls-v2-demo",
          open: false,
          baseLayers,
          overlays,
          enableMapLayers: true,
          buttonLabel: "Kaartlagen",
          panelTitle: "Kaartlagen",
          buttonLabelMode: "responsive",
        },
        html: {
          root: "#map-container-mock",
        },
        layout: "fullscreen",
      })
      .addDecorator(decorator);

    stories.add(
      "sidebar",
      templateMapper<MapControlsArgs>((args, { mapControlsV2Template }) =>
        mapControlsV2Template(mapControlsArgsMapper(args))
      ),
      {
        args: {
          mode: "sidebar",
        },
      }
    );

    stories.add(
      "floating",
      templateMapper<MapControlsArgs>((args, { mapControlsV2Template }) =>
        mapControlsV2Template(mapControlsArgsMapper(args))
      ),
      {
        args: {
          mode: "floating",
        },
      }
    );

    return stories;
  });
}
