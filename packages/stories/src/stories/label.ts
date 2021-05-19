import { action, HandlerFunction } from '@storybook/addon-actions';

import { Parameters, TemplateFn } from '@core';

export interface LabelArgs {
  status?: string;
  label: string;
  button?: {
    title: string;
    icon: string;
    onClick: HandlerFunction;
  };
}

export interface LabelTemplateFn<TemplateFnReturnType> extends TemplateFn<LabelArgs, TemplateFnReturnType> {
}

export interface LabelParameters<TemplateFnReturnType> extends Parameters<LabelArgs, TemplateFnReturnType> {
}

export function storiesOfLabel<TemplateFnReturnType>({
  module: mainModule,
  storiesOf,
  readme,
  template
}: LabelParameters<TemplateFnReturnType>) {
  const stories = storiesOf('Label', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: {
        status: {
          options: [undefined, 'primary', 'success', 'info', 'warning', 'danger'],
          control: {
            type: 'select',
          }
        },
        button: {
          control: {
            disable: true
          }
        }
      },
      args: {
        label: 'Label'
      }
    });

  stories.add(
    'default',
    template as any
  );

  stories.add(
    'with action',
    template as any,
    {
      args: {
        button: {
          title: 'Verwijder',
          icon: 'times',
          onClick: action('action activated')
        }
      }
    }
  );
}
