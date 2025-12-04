import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, PartialStoryFn, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import { MapLayerArgs, mapLayerArgTypes, mapLayerArgs, mapLayerArgsMapper } from "./map-layer.args.js";
import { MapLayer, MapLayerObject } from "./map-layer.models.js";

export type MapLayerDecorator<TemplateFnReturnType> = (story: PartialStoryFn) => TemplateFnReturnType;

type MapLayerStory = StoryObj<MapLayerArgs, Renderer>;

interface MapLayerStories {
  Multiple: MapLayerStory;
  Single: MapLayerStory;
}

interface MapLayerStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, MapLayerTemplates<TemplateFnReturnType>> {}

interface MapLayerTemplates<TemplateFnReturnType> {
  mapLayerTemplate: (mapLayerProperties: MapLayer<TemplateFnReturnType>) => TemplateFnReturnType;
  multiple: MapLayerObject<TemplateFnReturnType>[];
  single: MapLayerObject<TemplateFnReturnType>[];
}

export function mapLayerMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  MapLayerArgs
> {
  return {
    argTypes: mapLayerArgTypes,
    args: mapLayerArgs,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function mapLayerStories<Implementation, Templates, TemplateFnReturnType>(
  { storyTemplates, templateContainer }: MapLayerStoriesParameters<Implementation, Templates, TemplateFnReturnType>,
  decorator: MapLayerDecorator<TemplateFnReturnType>,
): MapLayerStories {
  return {
    Multiple: {
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (args, { mapLayerTemplate, multiple }) =>
        mapLayerTemplate(mapLayerArgsMapper(args, multiple)),
      ),
    },
    Single: {
      args: { ...mapLayerArgs, activatable: false },
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (args, { mapLayerTemplate, single }) =>
        mapLayerTemplate(mapLayerArgsMapper(args, single)),
      ),
    },
  };
}
