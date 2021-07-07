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
    'Spinner small (24px)',
    template,
    {
      args: {
        status: 'Een moment geduld alstublieft.',
        size: 'small'
      }
    }
  );

  stories.add(
    'Spinner small (32px)',
    template,
    {
      args: {
        status: 'Een moment geduld alstublieft.',
        size: 'medium'
      }
    }
  );

  stories.add(
    'Spinner small (48px)',
    template,
    {
      args: {
        status: 'Een moment geduld alstublieft.',
        size: 'large'
      }
    }
  );

  stories.add(
    'Spinner small - gecentreerd blok',
    template,
    {
      args: {
        status: 'Een moment geduld alstublieft.',
        size: 'small',
        block: true
      }
    }
  );

  stories.add(
    'Spinner medium - gecentreerd blok',
    template,
    {
      args: {
        status: 'Een moment geduld alstublieft.',
        size: 'medium',
        block: true,
        color: 'gray'
      }
    }
  );

  stories.add(
    'Spinner large - gecentreerd blok',
    template,
    {
      args: {
        status: 'Een moment geduld alstublieft.',
        size: 'large',
        block: true
      }
    }
  );
}
