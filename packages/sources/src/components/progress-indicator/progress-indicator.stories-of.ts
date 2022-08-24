import { bindTemplate, createStories, StorybookParameters } from '../../storybook';

import { progressIndicatorArgsMapper, progressIndicatorArgTypes } from './progress-indicator.args';
import { ProgressIndicator } from './progress-indicator.models';

export interface ProgressIndicatorParameters<TemplateFnReturnType> {
  progressIndicatorTemplate: (progressIndicatorProperties: ProgressIndicator) => TemplateFnReturnType;
}

export function storiesOfProgressIndicator<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    progressIndicatorTemplate
  }: ProgressIndicatorParameters<TemplateFnReturnType>
) {
  const stories = createStories('Progress Indicator', parameters, progressIndicatorArgTypes);
  const template = bindTemplate(progressIndicatorArgsMapper, progressIndicatorTemplate);

  stories.add(
    'small',
    template,
    {
      args: {
        size: 'small'
      }
    }
  );

  stories.add(
    'medium',
    template,
    {
      args: {
        size: 'medium'
      }
    }
  );

  stories.add(
    'large',
    template,
    {
      args: {
        size: 'large'
      }
    }
  );
}
