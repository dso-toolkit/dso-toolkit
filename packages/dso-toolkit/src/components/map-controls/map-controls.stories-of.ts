import { ComponentAnnotations, PartialStoryFn, Renderer } from "@storybook/types";

import { mapControlsArgsMapper, mapControlsArgTypes, MapControlsArgs } from "./map-controls.args.js";
import { MapControls } from "./map-controls.models.js";
import { baseLayers, overlays } from "./map-controls.content.js";
import { mapControlsDemoCss } from "./map-controls.demo";

import { StoriesParameters, StoryObj } from "../../template-container.js";
import { MetaOptions } from "../../storybook/meta-options.interface";
import { compiler } from "markdown-to-jsx";

export type MapControlsDecorator<TemplateFnReturnType> = (story: PartialStoryFn, css: string) => TemplateFnReturnType;

interface MapControlsStories {
  MapControls: StoryObj<MapControlsArgs, Renderer>;
}

interface MapControlsStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    MapControlsTemplates<TemplateFnReturnType>
  > {
  decorator: MapControlsDecorator<TemplateFnReturnType>;
}

export interface MapControlsTemplates<TemplateFnReturnType> {
  mapControlsTemplate: (mapControlsProperties: MapControls) => TemplateFnReturnType;
}

export function mapControlsMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  MapControlsArgs
> {
  return {
    argTypes: mapControlsArgTypes,
    args: {
      open: false,
      baseLayers,
      overlays,
    },
    parameters: {
      html: {
        root: "#map-container-mock",
      },
      layout: "fullscreen",
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function mapControlsStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
  decorator,
}: MapControlsStoriesParameters<Implementation, Templates, TemplateFnReturnType>): MapControlsStories {
  return {
    MapControls: {
      decorators: [(story) => decorator(story, mapControlsDemoCss)],
      render: templateContainer.render(storyTemplates, (args, { mapControlsTemplate }) =>
        mapControlsTemplate(mapControlsArgsMapper(args)),
      ),
    },
  };
}
