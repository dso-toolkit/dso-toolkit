import { ComponentAnnotations, PartialStoryFn, Renderer } from "@storybook/types";

import { ExpandableArgs, expandableArgsMapper, expandableArgTypes } from "./expandable.args.js";
import { Expandable } from "./expandable.models.js";
import { StoriesParameters, StoryObj } from "../../template-container";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { compiler } from "markdown-to-jsx";

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

interface ExpandableStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
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
      layout: "fullscreen",
    },
  };
}

export function expandableStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
  decorator,
}: ExpandableStoriesParameters<Implementation, Templates, TemplateFnReturnType>): ExpandableStories {
  return {
    Default: {
      args: {
        open: false,
        enableAnimation: false,
      },
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (args, { expandableTemplate, expandableContent }) =>
        expandableTemplate(expandableArgsMapper(args, expandableContent)),
      ),
    },
    WithAnimation: {
      args: {
        open: false,
        enableAnimation: true,
      },
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (args, { expandableTemplate, expandableContent }) =>
        expandableTemplate(expandableArgsMapper(args, expandableContent)),
      ),
    },
  };
}
