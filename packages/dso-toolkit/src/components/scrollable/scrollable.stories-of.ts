import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, PartialStoryFn, Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import { ScrollableArgs, scrollableArgTypes, scrollableArgsMapper } from "./scrollable.args.js";
import { Scrollable } from "./scrollable.models.js";

export type ScrollableDecorator<TemplateFnReturnType> = (story: PartialStoryFn) => TemplateFnReturnType;

type ScrollableStory = StoryObj<ScrollableArgs, Renderer>;

interface ScrollableStories {
  Default: ScrollableStory;
  DynamicContent: ScrollableStory;
}

interface ScrollableStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
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
      layout: "fullscreen",
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function scrollableStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
  decorator,
}: ScrollableStoriesParameters<Implementation, Templates, TemplateFnReturnType>): ScrollableStories {
  return {
    Default: {
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (args, { scrollableTemplate, defaultContent }) =>
        scrollableTemplate(scrollableArgsMapper(args, defaultContent)),
      ),
    },
    DynamicContent: {
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (args, { scrollableTemplate, dynamicContent }) =>
        scrollableTemplate(scrollableArgsMapper(args, dynamicContent)),
      ),
    },
  };
}
