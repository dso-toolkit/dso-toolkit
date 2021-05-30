import { HandlerFunction } from '@storybook/addon-actions';

import { bindTemplate, TemplateFn, Parameters } from '@core';

export interface InfoButton {
  active?: boolean;
  label?: string;
  onClick: (e: MouseEvent) => void;
}

export interface InfoButtonArgs {
  active?: boolean;
  label: string;
  click: HandlerFunction;
}

export interface InfoButtonTemplateFn<TemplateFnReturnType> extends TemplateFn<InfoButtonArgs, TemplateFnReturnType> {
}

export interface InfoButtonParameters<TemplateFnReturnType> extends Parameters<InfoButtonArgs, TemplateFnReturnType> {
}

export function storiesOfInfoButton<TemplateFnReturnType>({
  module: mainModule,
  storiesOf,
  readme,
  template
}: InfoButtonParameters<TemplateFnReturnType>) {
  const stories = storiesOf('Info Button', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      args: {
        label: 'Toelichting bij vraag'
      },
      argTypes: {
        label: {
          control: {
            type: 'text'
          }
        },
        active: {
          control: {
            type: 'boolean'
          }
        },
        click: {
          action: 'toggled'
        }
      }
    });

  stories.add(
    'inactive',
    bindTemplate(template),
    {
      args: {
        active: false
      }
    }
  );

  stories.add(
    'active',
    bindTemplate(template),
    {
      args: {
        active: true
      }
    }
  );
}
