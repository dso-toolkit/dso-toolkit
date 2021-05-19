import { HandlerFunction } from '@storybook/addon-actions';

import { Parameters, TemplateFn } from '@core';

export interface BannerArgs<TemplateFnReturnType> {
  status: string;
  richContent: TemplateFnReturnType;
  onClick: HandlerFunction;
}

export interface BannerTemplateFn<TemplateFnReturnType> extends TemplateFn<BannerArgs<TemplateFnReturnType>, TemplateFnReturnType> {
}

export interface BannerParameters<TemplateFnReturnType> extends Parameters<BannerArgs<TemplateFnReturnType>, TemplateFnReturnType> {
}

export interface BannerExtraParameters<TemplateFnReturnType> {
  warningRichContent: TemplateFnReturnType;
  richWarningRichContent: TemplateFnReturnType;
  dangerRichContent: TemplateFnReturnType;
  dangerWithHeadingsRichContent: TemplateFnReturnType;
}

export function storiesOfBanner<TemplateFnReturnType>({
  module: mainModule,
  storiesOf,
  readme,
  template
}: BannerParameters<TemplateFnReturnType>, {
  warningRichContent,
  richWarningRichContent,
  dangerRichContent,
  dangerWithHeadingsRichContent
}: BannerExtraParameters<TemplateFnReturnType>) {
  const stories = storiesOf('Banner', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: {
        richContent: {
          control: {
            disable: true
          }
        },
        status: {
          options: ['warning', 'danger'],
          control: {
            type: 'select'
          }
        },
        onClick: {
          action: 'closed'
        }
      }
    });

  stories.add(
    'warning',
    template as any,
    {
      args: {
        status: 'warning',
        richContent: warningRichContent
      }
    }
  );

  stories.add(
    'danger',
    template as any,
    {
      args: {
        status: 'danger',
        richContent: dangerRichContent
      }
    }
  );

  stories.add(
    'rich warning',
    template as any,
    {
      args: {
        status: 'warning',
        richContent: richWarningRichContent
      }
    }
  );

  stories.add(
    'danger with headings',
    template as any,
    {
      args: {
        status: 'danger',
        richContent: dangerWithHeadingsRichContent
      }
    }
  );
}
