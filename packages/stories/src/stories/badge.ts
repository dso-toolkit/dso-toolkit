import { bindTemplate, Parameters, TemplateFn } from '@core';

export interface BadgeArgs {
  status?: string;
  message: string;
}

export interface BadgeTemplateFn<TemplateFnReturnType> extends TemplateFn<BadgeArgs, TemplateFnReturnType> {
}

export interface BadgeParameters<TemplateFnReturnType> extends Parameters<BadgeArgs, TemplateFnReturnType> {
}

export function storiesOfBadge<TemplateFnReturnType>({
  module: mainModule,
  storiesOf,
  readme,
  template
}: BadgeParameters<TemplateFnReturnType>) {
  const stories = storiesOf('Badge', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: {
        status: {
          options: [undefined, 'primary', 'success', 'info', 'warning', 'danger'],
          control: {
            type: 'select'
          }
        }
      }
    });

  stories.add(
    'plain',
    bindTemplate(template),
    {
      args: {
        message: 'Plain'
      }
    }
  );

  stories.add(
    'primary',
    bindTemplate(template),
    {
      args: {
        status: 'primary',
        message: 'Primary'
      }
    }
  );

  stories.add(
    'success',
    bindTemplate(template),
    {
      args: {
        status: 'success',
        message: 'Success'
      }
    }
  );

  stories.add(
    'info',
    bindTemplate(template),
    {
      args: {
        status: 'info',
        message: 'Info'
      }
    }
  );

  stories.add(
    'warning',
    bindTemplate(template),
    {
      args: {
        status: 'warning',
        message: 'Warning'
      }
    }
  );

  stories.add(
    'danger',
    bindTemplate(template),
    {
      args: {
        status: 'danger',
        message: 'Danger'
      }
    }
  );
}
