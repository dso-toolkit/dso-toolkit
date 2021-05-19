import { Parameters, TemplateFn } from '@core';

export interface BadgeArgs {
  status: string;
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
    template as any,
    {
      args: {
        message: 'Plain'
      }
    }
  );

  stories.add(
    'primary',
    template as any,
    {
      args: {
        status: 'primary',
        message: 'Primary'
      }
    }
  );

  stories.add(
    'success',
    template as any,
    {
      args: {
        status: 'success',
        message: 'Success'
      }
    }
  );

  stories.add(
    'info',
    template as any,
    {
      args: {
        status: 'info',
        message: 'Info'
      }
    }
  );

  stories.add(
    'warning',
    template as any,
    {
      args: {
        status: 'warning',
        message: 'Warning'
      }
    }
  );

  stories.add(
    'danger',
    template as any,
    {
      args: {
        status: 'danger',
        message: 'Danger'
      }
    }
  );
}
