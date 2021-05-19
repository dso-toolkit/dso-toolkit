import { bindTemplate, Parameters, TemplateFn } from '@core';

export interface ProgressBarArgs {
  progress: number;
  label?: string;
  min?: number;
  max?: number;
}

export interface ProgressBarTemplateFn<TemplateFnReturnType> extends TemplateFn<ProgressBarArgs, TemplateFnReturnType> {
}

export interface ProgressBarParameters<TemplateFnReturnType> extends Parameters<ProgressBarArgs, TemplateFnReturnType> {
}

export function storiesOfProgressBar<TemplateFnReturnType>({
  module: mainModule,
  storiesOf,
  readme,
  template
}: ProgressBarParameters<TemplateFnReturnType>) {
  const stories = storiesOf('Progress Bar', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: {
        min: {
          control: {
            type: 'number'
          }
        },
        max: {
          control: {
            type: 'number'
          }
        }
      }
    });

  stories.add(
    'default',
    bindTemplate(template),
    {
      args: {
        progress: 30
      }
    }
  );

  stories.add(
    'with label',
    bindTemplate(template),
    {
      args: {
        progress: 60,
        label: 'Nog ongeveer 4 minuten'
      }
    }
  );

  stories.add(
    'arbitrary values',
    bindTemplate(template),
    {
      args: {
        progress: 3,
        max: 4,
        label: '3/4'
      }
    }
  );
}
