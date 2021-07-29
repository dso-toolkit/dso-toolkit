import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { progressBarArgsMapper, progressBarArgTypes } from './progress-bar.args';
import { ProgressBar } from './progress-bar.models';

export interface ProgressBarParameters<TemplateFnReturnType> {
  progressBarTemplate: (progressBarProperties: ProgressBar) => TemplateFnReturnType;
}

export function storiesOfProgressBar<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    progressBarTemplate
  }: ProgressBarParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(progressBarArgsMapper, progressBarTemplate);

  const stories = storiesOf('Progress Bar', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: progressBarArgTypes
    });

  stories.add(
    'default',
    template,
    {
      args: {
        progress: 30
      }
    }
  );

  stories.add(
    'with label',
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
        progress: 3,
        max: 4,
        label: '3/4'
      }
    }
  );
}
