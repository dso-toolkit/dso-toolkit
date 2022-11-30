import { Parameters } from "@storybook/addons";
import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";

import { ProgressBarArgs, progressBarArgsMapper, progressBarArgTypes } from "./progress-bar.args";
import { ProgressBar } from "./progress-bar.models";

export interface ProgressBarTemplates<TemplateFnReturnType> {
  progressBarTemplate: (progressBarProperties: ProgressBar) => TemplateFnReturnType;
}

export function storiesOfProgressBar<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    ProgressBarTemplates<TemplateFnReturnType>
  >,
  parameters?: Parameters
) {
  return storiesOfFactory("Progress Bar", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: progressBarArgTypes,
      ...parameters,
    });

    const template = templateMapper<ProgressBarArgs>((args, { progressBarTemplate }) =>
      progressBarTemplate(progressBarArgsMapper(args))
    );

    stories.add("default", template, {
      args: {
        progress: 60,
        label: "Genereren export: nog ongeveer 4 minuten.",
      },
    });

    stories.add("arbitrary values", template, {
      args: {
        progress: 4,
        max: 12,
        label: "Bestanden comprimeren: 12 stuks.",
      },
    });

    return stories;
  });
}
