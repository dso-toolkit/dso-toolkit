import { HandlerFunction } from '@storybook/addon-actions';

import { bindTemplate, Parameters, TemplateFn } from '@core';

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
    bindTemplate(template),
    {
      args: {
        status: 'warning',
        richContent: warningRichContent
      }
    }
  );

  stories.add(
    'danger',
    bindTemplate(template),
    {
      args: {
        status: 'danger',
        richContent: dangerRichContent
      }
    }
  );

  stories.add(
    'rich warning',
    bindTemplate(template),
    {
      args: {
        status: 'warning',
        richContent: richWarningRichContent
      }
    }
  );

  stories.add(
    'danger with headings',
    bindTemplate(template),
    {
      args: {
        status: 'danger',
        richContent: dangerWithHeadingsRichContent
      }
    }
  );
}
