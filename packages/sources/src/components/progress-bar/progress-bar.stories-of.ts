import { bindTemplate, createStories, StorybookParameters } from '../../storybook';

import { progressBarArgsMapper, progressBarArgTypes } from './progress-bar.args';
import { ProgressBar } from './progress-bar.models';

export interface ProgressBarParameters<TemplateFnReturnType> {
  progressBarTemplate: (progressBarProperties: ProgressBar) => TemplateFnReturnType;
}

export function storiesOfProgressBar<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    progressBarTemplate
  }: ProgressBarParameters<TemplateFnReturnType>
) {
  const stories = createStories('Progress Bar', parameters, progressBarArgTypes);
  const template = bindTemplate(progressBarArgsMapper, progressBarTemplate);

  stories.add(
    'default',
    template,
    {
      args: {
        progress: 60,
        label: 'Genereren export: nog ongeveer 4 minuten.'
      }
    }
  );

  stories.add(
    'arbitrary values',
    template,
    {
      args: {
        progress: 4,
        max: 12,
        label: 'Bestanden comprimeren: 12 stuks.'
      }
    }
  );
}
