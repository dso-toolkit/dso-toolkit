import { storiesOfFactory } from '../../storybook/stories-of-factory';

import { ProgressIndicatorArgs, progressIndicatorArgsMapper, progressIndicatorArgTypes } from './progress-indicator.args';
import { ProgressIndicator } from './progress-indicator.models';

export interface ProgressIndicatorTemplates<TemplateFnReturnType> {
  progressIndicatorTemplate: (progressIndicatorProperties: ProgressIndicator) => TemplateFnReturnType;
}

export const storiesOfProgressIndicator = storiesOfFactory<ProgressIndicatorTemplates<any>, ProgressIndicatorArgs>('Progress Indicator', (stories, templateMapper) => {
  stories.addParameters({
    argTypes: progressIndicatorArgTypes
  });

  const template = templateMapper((args, { progressIndicatorTemplate }) => progressIndicatorTemplate(progressIndicatorArgsMapper(args)));

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
});
