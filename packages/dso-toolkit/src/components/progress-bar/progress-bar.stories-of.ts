import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

import { ProgressBarArgs, progressBarArgsMapper, progressBarArgTypes } from "./progress-bar.args.js";
import { ProgressBar } from "./progress-bar.models.js";

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
) {
  return storiesOfFactory("Progress Bar", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: progressBarArgTypes,
    });

    const template = templateMapper<ProgressBarArgs>((args, { progressBarTemplate }) =>
      progressBarTemplate(progressBarArgsMapper(args)),
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
