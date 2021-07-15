import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { progressIndicatorArgsMapper, progressIndicatorArgTypes } from './progress-indicator.args';
import { ProgressIndicator } from './progress-indicator.models';

export interface ProgressIndicatorParameters<TemplateFnReturnType> {
  progressIndicatorTemplate: (progressIndicatorProperties: ProgressIndicator) => TemplateFnReturnType;
}

export function storiesOfProgressIndicator<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    progressIndicatorTemplate
  }: ProgressIndicatorParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(progressIndicatorArgsMapper, progressIndicatorTemplate);

  const stories = storiesOf('Progress Indicator', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: progressIndicatorArgTypes
    });

  stories.add(
    'Spinner small',
    template,
    {
      args: {
        size: 'small'
      }
    }
  );

  stories.add(
    'Spinner medium',
    template,
    {
      args: {
        size: 'medium'
      }
    }
  );

  stories.add(
    'Spinner large',
    template,
    {
      args: {
        size: 'large'
      }
    }
  );
}
