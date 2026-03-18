import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import { mapMessageArgTypes, mapMessageArgsMapper } from "./map-message.args.js";
import { MapMessage } from "./map-message.models.js";

type MapMessageStory = StoryObj<MapMessage, Renderer>;

interface MapMessageStories {
  Instruction: MapMessageStory;
  Success: MapMessageStory;
  Error: MapMessageStory;
}

export interface MapMessageTemplates<TemplateFnReturnType> {
  mapMessageTemplate: (mapMessageProperties: MapMessage) => TemplateFnReturnType;
}

const baseStoryParameters = {
  parameters: {
    layout: "centered",
  },
};

export function mapMessageMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  MapMessage
> {
  return {
    argTypes: mapMessageArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

interface MapMessageStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
  MapMessageTemplates<TemplateFnReturnType>
> {}

export function mapMessageStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: MapMessageStoriesParameters<Implementation, Templates, TemplateFnReturnType>): MapMessageStories {
  return {
    Instruction: {
      ...baseStoryParameters,
      args: {
        variant: "instruction",
        message: "Dit is een instructie kaartbericht.",
      },
      render: templateContainer.render(storyTemplates, (args, { mapMessageTemplate }) =>
        mapMessageTemplate(mapMessageArgsMapper(args)),
      ),
    },
    Success: {
      ...baseStoryParameters,
      args: {
        variant: "success",
        message: "Dit is een succes kaartbericht.",
        buttons: [
          {
            label: "Ongedaan maken",
            icon: { icon: "undo" },
            variant: "secondary",
            type: "button",
            modifier: "dso-extra-small",
            iconMode: "after",
          },
          {
            label: "Volgende",
            icon: { icon: "chevron-right" },
            variant: "primary",
            type: "button",
            modifier: "dso-extra-small",
            iconMode: "after",
          },
        ],
      },
      render: templateContainer.render(storyTemplates, (args, { mapMessageTemplate }) =>
        mapMessageTemplate(mapMessageArgsMapper(args)),
      ),
    },
    Error: {
      ...baseStoryParameters,
      args: {
        variant: "error",
        message: "Dit is een fout kaartbericht.",
        buttons: [
          {
            label: "Sluiten",
            icon: { icon: "cross" },
            variant: "secondary",
            type: "button",
            modifier: "dso-extra-small",
            iconMode: "after",
          },
          {
            label: "Opnieuw proberen",
            icon: { icon: "undo" },
            variant: "primary",
            type: "button",
            modifier: "dso-extra-small",
            iconMode: "after",
          },
        ],
      },
      render: templateContainer.render(storyTemplates, (args, { mapMessageTemplate }) =>
        mapMessageTemplate(mapMessageArgsMapper(args)),
      ),
    },
  };
}
