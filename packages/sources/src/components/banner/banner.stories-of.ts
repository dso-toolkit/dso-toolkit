import { storiesOfFactory } from '../../storybook/stories-of-factory';

import { BannerArgs, bannerArgsMapper, bannerArgTypes } from './banner.args';
import { dangerRichContent, dangerWithHeadingsRichContent, richWarningRichContent, warningRichContent } from './banner.content';
import { Banner } from './banner.models';

export interface BannerTemplates<TemplateFnReturnType> {
  bannerTemplate: (bannerProperties: Banner<TemplateFnReturnType>) => TemplateFnReturnType;
}

export const storiesOfBanner = storiesOfFactory<BannerTemplates<any>, BannerArgs>('Banner', (stories, templateMapper) => {
  stories
    .addParameters({
      argTypes: bannerArgTypes
    });

  const template = templateMapper((args, { bannerTemplate }) => bannerTemplate(bannerArgsMapper(args)));

  stories.add(
    'danger',
    template,
    {
      args: {
        status: 'danger',
        richContent: dangerRichContent
      }
    }
  );

  stories.add(
    'warning',
    template,
    {
      args: {
        status: 'warning',
        richContent: warningRichContent
      }
    }
  );

  stories.add(
    'rich warning',
    template,
    {
      args: {
        status: 'danger',
        richContent: richWarningRichContent
      }
    }
  );

  stories.add(
    'danger with headings',
    template,
    {
      args: {
        status: 'warning',
        richContent: dangerWithHeadingsRichContent
      }
    }
  );
})
