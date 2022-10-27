import { storiesOfFactory } from '../../storybook/stories-of-factory';

import { ProgressBarArgs, progressBarArgsMapper, progressBarArgTypes } from './progress-bar.args';
import { ProgressBar } from './progress-bar.models';

export interface ProgressBarTemplates<TemplateFnReturnType> {
  progressBarTemplate: (progressBarProperties: ProgressBar) => TemplateFnReturnType;
}

export const storiesOfProgressBar = storiesOfFactory<ProgressBarTemplates<any>, ProgressBarArgs>('Progress Bar', (stories, templateMapper) => {
  stories.addParameters({
    argTypes: progressBarArgTypes
  });

  const template = templateMapper((args, { progressBarTemplate }) => progressBarTemplate(progressBarArgsMapper(args)));

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
});
