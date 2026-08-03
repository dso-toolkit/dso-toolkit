import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, PartialStoryFn, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters2, StoryObj } from "../../template-container";

import { IconArgs, iconArgTypes, iconArgsMapper } from "./icon.args.js";
import { Icon } from "./icon.models.js";

export type IconOverviewDecorator<TemplateFnReturnType> = (
  story: PartialStoryFn,
  icons: string[],
) => TemplateFnReturnType;

type IconStory = StoryObj<IconArgs, Renderer>;

interface IconStories {
  Default: IconStory;
  Overview: IconStory;
}

export interface IconTemplates<TemplateFnReturnType> {
  iconTemplate: (iconProperties: Icon) => TemplateFnReturnType;
}

interface IconStoriesParameters<TemplateFnReturnType> extends StoriesParameters2<IconTemplates<TemplateFnReturnType>> {
  icons: string[];
  decorator?: IconOverviewDecorator<TemplateFnReturnType>;
}

export function iconMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  IconArgs
> {
  return {
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function iconStories<TemplateFnReturnType>({
  storyTemplates,
  icons,
  decorator,
}: IconStoriesParameters<TemplateFnReturnType>): IconStories {
  return {
    Default: {
      argTypes: iconArgTypes(icons),
      args: {
        icon: "user-solid",
      },
      render: (args) => storyTemplates().iconTemplate(iconArgsMapper(args)),
    },
    Overview: {
      decorators: [(story) => (decorator ? decorator(story, icons) : story)],
      render: (args) => storyTemplates().iconTemplate(iconArgsMapper(args)),
    },
  };
}
