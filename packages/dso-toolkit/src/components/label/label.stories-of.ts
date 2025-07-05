import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, PartialStoryFn, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import { LabelArgs, labelArgTypes, labelArgsMapper } from "./label.args.js";
import { css } from "./label.demo.js";
import { Label } from "./label.models.js";

export type LabelDecorator<TemplateFnReturnType> = (story: PartialStoryFn, css: string) => TemplateFnReturnType;

type LabelStory = StoryObj<LabelArgs, Renderer>;

interface LabelStories {
  Default: LabelStory;
  WithAction: LabelStory;
  Truncate: LabelStory;
  WithSymbolImage: LabelStory;
  WithSymbolColor: LabelStory;
}

interface LabelStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, LabelTemplates<TemplateFnReturnType>> {
  decorator: LabelDecorator<TemplateFnReturnType>;
}

interface LabelTemplates<TemplateFnReturnType> {
  labelTemplate: (labelProperties: Label) => TemplateFnReturnType;
}

export function labelMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  LabelArgs
> {
  return {
    argTypes: labelArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function labelStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
  decorator,
}: LabelStoriesParameters<Implementation, Templates, TemplateFnReturnType>): LabelStories {
  return {
    Default: {
      args: {
        label: "Label",
      },
      render: templateContainer.render(storyTemplates, (args, { labelTemplate }) =>
        labelTemplate(labelArgsMapper(args)),
      ),
    },
    WithAction: {
      args: {
        label: "Label",
        removable: true,
      },
      render: templateContainer.render(storyTemplates, (args, { labelTemplate }) =>
        labelTemplate(labelArgsMapper(args)),
      ),
    },
    Truncate: {
      args: {
        label: "Een hele lange label die je eigenlijk visueel wil afbreken.",
        truncate: true,
      },
      render: templateContainer.render(storyTemplates, (args, { labelTemplate }) =>
        labelTemplate(labelArgsMapper(args)),
      ),
    },
    WithSymbolImage: {
      args: {
        label: "Label",
        status: "bright",
        symbol: '<span class="symboolcode" data-symboolcode="vag000"></span>',
      },
      decorators: [(story) => decorator(story, css)],
      render: templateContainer.render(storyTemplates, (args, { labelTemplate }) =>
        labelTemplate(labelArgsMapper(args)),
      ),
    },
    WithSymbolColor: {
      args: {
        label: "Label",
        status: "bright",
        symbol: '<span class="symboolcode" data-symboolcode="vszt030"></span>',
      },
      decorators: [(story) => decorator(story, css)],
      render: templateContainer.render(storyTemplates, (args, { labelTemplate }) =>
        labelTemplate(labelArgsMapper(args)),
      ),
    },
  };
}
