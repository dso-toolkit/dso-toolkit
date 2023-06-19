import { Addon_DecoratorFunction } from "@storybook/types";
import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

import { mapControlsArgsMapper, mapControlsArgTypes, MapControlsArgs } from "./map-controls.args.js";
import { baseLayers, overlays } from "./map-controls.content.js";
import { MapControls } from "./map-controls.models.js";

export interface MapControlsTemplates<TemplateFnReturnType> {
  mapControlsTemplate: (mapControlsProperties: MapControls) => TemplateFnReturnType;
}

export interface MapControlsParameters<TemplateFnReturnType> {
  decorator: Addon_DecoratorFunction<TemplateFnReturnType>;
}

export function storiesOfMapControls<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    MapControlsTemplates<TemplateFnReturnType>
  >,
  { decorator }: MapControlsParameters<TemplateFnReturnType>
) {
  return storiesOfFactory("Map Controls", storiesOfArguments, (stories, templateMapper) => {
    stories
      .addParameters({
        argTypes: mapControlsArgTypes,
        args: {
          open: false,
          baseLayers,
          overlays,
        },
        html: {
          root: "#map-container-mock",
        },
        layout: "fullscreen",
      })
      .addDecorator(decorator);

    stories.add(
      "Map Controls",
      templateMapper<MapControlsArgs>((args, { mapControlsTemplate }) =>
        mapControlsTemplate(mapControlsArgsMapper(args))
      )
    );

    return stories;
  });
}
