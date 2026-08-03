import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, PartialStoryFn, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters2, StoryObj } from "../../template-container";

import { ExpandableArgs, expandableArgTypes, expandableArgsMapper } from "./expandable.args.js";
import { Expandable } from "./expandable.models.js";

export type ExpandableDecorator<TemplateFnReturnType> = (story: PartialStoryFn) => TemplateFnReturnType;

type ExpandableStory = StoryObj<ExpandableArgs, Renderer>;

interface ExpandableStories {
  Default: ExpandableStory;
  WithAnimation: ExpandableStory;
}

export interface ExpandableTemplates<TemplateFnReturnType> {
  expandableTemplate: (expandableProperties: Expandable<TemplateFnReturnType>) => TemplateFnReturnType;
  expandableContent: TemplateFnReturnType;
}

interface ExpandableStoriesParameters<TemplateFnReturnType> extends StoriesParameters2<
  ExpandableTemplates<TemplateFnReturnType>
> {
  decorator: ExpandableDecorator<TemplateFnReturnType>;
}

export function expandableMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  ExpandableArgs
> {
  return {
    argTypes: expandableArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
      html: {
        root: "#expandable-mock",
      },
    },
  };
}

export function expandableStories<TemplateFnReturnType>({
  storyTemplates,
  decorator,
}: ExpandableStoriesParameters<TemplateFnReturnType>): ExpandableStories {
  const render = (args: ExpandableArgs) =>
    storyTemplates().expandableTemplate(expandableArgsMapper(args, storyTemplates().expandableContent));

  return {
    Default: {
      args: {
        open: false,
        enableAnimation: false,
      },
      decorators: [(story) => decorator(story)],
      render,
      parameters: {
        layout: "fullscreen",
      },
    },
    WithAnimation: {
      args: {
        open: false,
        enableAnimation: true,
      },
      decorators: [(story) => decorator(story)],
      render,
      parameters: {
        layout: "fullscreen",
      },
    },
  };
}
