import { HandlerFunction } from '@storybook/addon-actions';

import { Parameters, TemplateFn } from '@core';

export interface AlertArgs {
  status: string;
  message: string;
  onClick: HandlerFunction;
  withRoleAlert: boolean;
  withButton: boolean;
}

export interface AlertTemplateFn<TemplateFnReturnType> extends TemplateFn<AlertArgs, TemplateFnReturnType> {
}

export interface AlertParameters<TemplateFnReturnType> extends Parameters<AlertArgs, TemplateFnReturnType> {
}

export function storiesOfAlert<TemplateFnReturnType>({
  module: mainModule,
  storiesOf,
  readme,
  template
}: AlertParameters<TemplateFnReturnType>) {
  const stories = storiesOf('Alert', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      args: {
        withRoleAlert: false,
        withButton: true
      },
      argTypes: {
        status: {
          options: ['success', 'info', 'warning', 'danger'],
          control: {
            type: 'select',
          }
        },
        message: {
          control: {
            type: 'text',
            required: true
          }
        },
        withRoleAlert: {
          control: {
            type: 'boolean'
          }
        },
        withButton: {
          control: {
            type: 'boolean'
          }
        },
        onClick: {
          action: 'closed'
        }
      }
    });

  stories.add(
    'success',
    template as any,
    {
      args: {
        status: 'success',
        message: 'Dit is een succesmelding. Deze wordt getoond als een proces succesvol is afgerond.'
      }
    }
  );

  stories.add(
    'info',
    template as any,
    {
      args: {
        status: 'info',
        message: 'Dit is een informatiemelding. Deze wordt gebruikt voor <a href="#">aanvullende</a> informatie of tips.'
      }
    }
  );

  stories.add(
    'warning',
    template as any,
    {
      args: {
        status: 'warning',
        message: 'Dit is een waarschuwingsmelding. Deze wordt gebruikt voor waarschuwingen.'
      }
    }
  );

  stories.add(
    'danger',
    template as any,
    {
      args: {
        status: 'danger',
        message: 'Dit is een <a href="#">foutmelding</a>. Deze wordt getoond als er iets is misgegaan.'
      }
    }
  );
}
