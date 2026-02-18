import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import { mapMessageArgTypes, mapMessageArgs, mapMessageArgsMapper } from "./map-message.args.js";
import { MapMessage } from "./map-message.models.js";

type MapMessageStory = StoryObj<MapMessage, Renderer>;

interface MapMessageStories {
  Introduction: MapMessageStory;
  Success: MapMessageStory;
  Error: MapMessageStory;
}

interface MapMessageStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
  MapMessageTemplates<TemplateFnReturnType>
> {}

interface MapMessageTemplates<TemplateFnReturnType> {
  mapMessageTemplate: (mapMessageProperties: MapMessage) => TemplateFnReturnType;
}

export function mapMessageMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  MapMessage
> {
  return {
    argTypes: mapMessageArgTypes,
    args: mapMessageArgs,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function mapMessageStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: MapMessageStoriesParameters<Implementation, Templates, TemplateFnReturnType>): MapMessageStories {
  return {
    Introduction: {
      render: templateContainer.render(storyTemplates, (args, { mapMessageTemplate }) =>
        mapMessageTemplate(mapMessageArgsMapper(args)),
      ),
    },
    Success: {
      args: {
        variant: "success",
        message: "This is a success map message.",
        buttonLabels: ["Ongedaan maken", "Volgende"],
      },
      render: templateContainer.render(storyTemplates, (args, { mapMessageTemplate }) =>
        mapMessageTemplate(mapMessageArgsMapper(args)),
      ),
    },
    Error: {
      args: {
        variant: "error",
        message: "This is an error map message.",
        buttonLabels: ["Sluiten", "Opnieuw proberen"],
      },
      render: templateContainer.render(storyTemplates, (args, { mapMessageTemplate }) =>
        mapMessageTemplate(mapMessageArgsMapper(args)),
      ),
    },
  };
}
