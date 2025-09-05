import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, PartialStoryFn, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import { IconButtonArgs, iconButtonArgTypes, iconButtonArgs, iconButtonArgsMapper } from "./icon-button.args.js";
import { IconButton } from "./icon-button.models.js";

export type IconButtonDecorator<TemplateFnReturnType> = (story: PartialStoryFn) => TemplateFnReturnType;

type IconButtonStory = StoryObj<IconButtonArgs, Renderer>;

interface IconButtonStories {
  Secondary: IconButtonStory;
  Tertiary: IconButtonStory;
  TertiaryOnColor: IconButtonStory;
  Map: IconButtonStory;
}

interface IconButtonStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    IconButtonTemplates<TemplateFnReturnType>
  > {
  icons: string[];
}

interface IconButtonTemplates<TemplateFnReturnType> {
  iconButtonTemplate: (iconButtonProperties: IconButton) => TemplateFnReturnType;
}

export function iconButtonMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  IconButtonArgs
> {
  return {
    args: iconButtonArgs,
    parameters: {
      layout: "centered",
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function iconButtonStories<Implementation, Templates, TemplateFnReturnType>(
  {
    storyTemplates,
    templateContainer,
    icons,
  }: IconButtonStoriesParameters<Implementation, Templates, TemplateFnReturnType>,
  decorator: IconButtonDecorator<TemplateFnReturnType>,
): IconButtonStories {
  const render = templateContainer.render(storyTemplates, (args: IconButtonArgs, { iconButtonTemplate }) =>
    iconButtonTemplate(iconButtonArgsMapper(args)),
  );

  return {
    Secondary: {
      decorators: [(story) => decorator(story)],
      argTypes: iconButtonArgTypes(icons),
      render,
    },
    Tertiary: {
      decorators: [(story) => decorator(story)],
      argTypes: iconButtonArgTypes(icons),
      args: {
        variant: "tertiary",
      },
      render,
    },
    TertiaryOnColor: {
      decorators: [(story) => decorator(story)],
      argTypes: iconButtonArgTypes(icons),
      args: {
        variant: "tertiary-on-color",
      },
      render,
    },
    Map: {
      decorators: [(story) => decorator(story)],
      argTypes: iconButtonArgTypes(icons),
      args: {
        variant: "map",
      },
      render,
    },
  };
}
