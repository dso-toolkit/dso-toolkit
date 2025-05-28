import { ComponentAnnotations, Renderer } from "@storybook/types";
import { compiler } from "markdown-to-jsx";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import { ProgressBarArgs, progressBarArgTypes, progressBarArgsMapper } from "./progress-bar.args.js";
import { ProgressBar } from "./progress-bar.models.js";

type ProgressBarStory = StoryObj<ProgressBarArgs, Renderer>;

interface ProgressBarStories {
  Default: ProgressBarStory;
  ArbitraryValues: ProgressBarStory;
}

interface ProgressBarStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    ProgressBarTemplates<TemplateFnReturnType>
  > {}

export interface ProgressBarTemplates<TemplateFnReturnType> {
  progressBarTemplate: (progressBarProperties: ProgressBar) => TemplateFnReturnType;
}

export function progressBarMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  ProgressBarArgs
> {
  return {
    argTypes: progressBarArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function progressBarStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: ProgressBarStoriesParameters<Implementation, Templates, TemplateFnReturnType>): ProgressBarStories {
  const render = templateContainer.render(storyTemplates, (args: ProgressBarArgs, { progressBarTemplate }) =>
    progressBarTemplate(progressBarArgsMapper(args)),
  );

  return {
    Default: {
      args: {
        progress: 60,
        label: "Genereren export: nog ongeveer 4 minuten.",
      },
      render,
    },
    ArbitraryValues: {
      args: {
        progress: 4,
        max: 12,
        label: "Bestanden comprimeren: 12 stuks.",
      },
      render,
    },
  };
}
