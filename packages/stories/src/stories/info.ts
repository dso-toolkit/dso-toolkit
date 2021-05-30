import { HandlerFunction } from '@storybook/addon-actions';

import { bindTemplate, TemplateFn, Parameters } from '@core';

export interface Info<TemplateFnReturnType> {
  fixed?: boolean;
  richContent: TemplateFnReturnType;
  onClose: (e: MouseEvent) => void;
}

export interface InfoArgs<TemplateFnReturnType> {
  fixed?: boolean;
  richContent: TemplateFnReturnType;
  close: HandlerFunction;
}

export interface InfoTemplateFn<TemplateFnReturnType> extends TemplateFn<InfoArgs<TemplateFnReturnType>, TemplateFnReturnType> {
}

export interface InfoParameters<TemplateFnReturnType> extends Parameters<InfoArgs<TemplateFnReturnType>, TemplateFnReturnType> {
}

export interface InfoExtraParameters<TemplateFnReturnType> {
  richContent: TemplateFnReturnType;
}

export function storiesOfInfo<TemplateFnReturnType>({
  module: mainModule,
  storiesOf,
  readme,
  template
}: InfoParameters<TemplateFnReturnType>, {
  richContent
}: InfoExtraParameters<TemplateFnReturnType>) {
  const stories = storiesOf('Info', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      args: {
        richContent
      },
      argTypes: {
        fixed: {
          control: {
            type: 'boolean'
          }
        },
        close: {
          action: 'closed'
        },
        richContent: {
          control: {
            disable: true
          }
        }
      }
    });

  stories.add(
    'default',
    bindTemplate(template)
  );

  stories.add(
    'fixed',
    bindTemplate(template),
    {
      args: {
        fixed: true
      }
    }
  );
}
