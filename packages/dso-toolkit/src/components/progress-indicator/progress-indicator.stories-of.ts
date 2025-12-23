import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import {
  ProgressIndicatorArgs,
  progressIndicatorArgTypes,
  progressIndicatorArgsMapper,
} from "./progress-indicator.args.js";
import { ProgressIndicator } from "./progress-indicator.models.js";

type ProgressIndicatorStory = StoryObj<ProgressIndicatorArgs, Renderer>;

interface ProgressIndicatorStories {
  Small: ProgressIndicatorStory;
  Medium: ProgressIndicatorStory;
  Large: ProgressIndicatorStory;
}

interface ProgressIndicatorStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
  ProgressIndicatorTemplates<TemplateFnReturnType>
> {}

export interface ProgressIndicatorTemplates<TemplateFnReturnType> {
  progressIndicatorTemplate: (progressIndicatorProperties: ProgressIndicator) => TemplateFnReturnType;
}

export function progressIndicatorMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  ProgressIndicatorArgs
> {
  return {
    argTypes: progressIndicatorArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function progressIndicatorStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: ProgressIndicatorStoriesParameters<Implementation, Templates, TemplateFnReturnType>): ProgressIndicatorStories {
  const render = templateContainer.render(
    storyTemplates,
    (args: ProgressIndicatorArgs, { progressIndicatorTemplate }) =>
      progressIndicatorTemplate(progressIndicatorArgsMapper(args)),
  );

  return {
    Small: {
      args: {
        size: "small",
      },
      render,
    },
    Medium: {
      args: {
        size: "medium",
      },
      render,
    },
    Large: {
      args: {
        size: "large",
      },
      render,
    },
  };
}
