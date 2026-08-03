import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, PartialStoryFn, Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters2, StoryObj } from "../../template-container";

import { ScrollableArgs, scrollableArgTypes, scrollableArgsMapper } from "./scrollable.args.js";
import { Scrollable } from "./scrollable.models.js";

export type ScrollableDecorator<TemplateFnReturnType> = (story: PartialStoryFn) => TemplateFnReturnType;

type ScrollableStory = StoryObj<ScrollableArgs, Renderer>;

interface ScrollableStories {
  Default: ScrollableStory;
  DynamicContent: ScrollableStory;
}

interface ScrollableStoriesParameters<TemplateFnReturnType> extends StoriesParameters2<
  ScrollableTemplates<TemplateFnReturnType>
> {
  decorator: ScrollableDecorator<TemplateFnReturnType>;
}

export interface ScrollableTemplates<TemplateFnReturnType> {
  scrollableTemplate: (scrollableProperties: Scrollable<TemplateFnReturnType>) => TemplateFnReturnType;
  defaultContent: TemplateFnReturnType;
  dynamicContent: TemplateFnReturnType;
}

export function scrollableMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  ScrollableArgs
> {
  return {
    argTypes: scrollableArgTypes,
    args: {
      dsoScrollEnd: fn(),
    },
    parameters: {
      html: {
        root: "#scrollable-mock",
      },
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function scrollableStories<TemplateFnReturnType>({
  storyTemplates,

  decorator,
}: ScrollableStoriesParameters<TemplateFnReturnType>): ScrollableStories {
  return {
    Default: {
      decorators: [(story) => decorator(story)],
      render: (args) =>
        storyTemplates().scrollableTemplate(scrollableArgsMapper(args, storyTemplates().defaultContent)),
      parameters: {
        layout: "fullscreen",
      },
    },
    DynamicContent: {
      decorators: [(story) => decorator(story)],
      render: (args) =>
        storyTemplates().scrollableTemplate(scrollableArgsMapper(args, storyTemplates().dynamicContent)),
      parameters: {
        layout: "fullscreen",
      },
    },
  };
}
