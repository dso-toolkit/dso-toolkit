import { bindTemplate, Parameters, TemplateFn } from '@core';

export interface IconArgs {
  icon: string;
}

export interface IconTemplateFn<TemplateFnReturnType> extends TemplateFn<IconArgs, TemplateFnReturnType> {
}

export interface IconParameters<TemplateFnReturnType> extends Parameters<IconArgs, TemplateFnReturnType> {
}

export function storiesOfIcon<TemplateFnReturnType>({
  module: mainModule,
  storiesOf,
  readme,
  template
}: IconParameters<TemplateFnReturnType>) {
  const stories = storiesOf('Icon', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: {
        icon: {
          options: ['user', 'table'],
          control: {
            type: 'select',
          }
        }
      },
      args: {
        icon: 'user'
      }
    });

  stories.add(
    'Icon',
    bindTemplate(template),
    {
      args: {
        icon: 'user'
      }
    }
  );
}
