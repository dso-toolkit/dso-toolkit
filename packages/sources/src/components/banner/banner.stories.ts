import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { bannerArgsMapper, BannerArgs, bannerArgTypes } from './banner.args';
import { Banner } from './banner.models';

export interface BannerParameters<TemplateFnReturnType> {
  bannerTemplate: (bannerProperties: Banner<TemplateFnReturnType>) => TemplateFnReturnType;
  warningRichContent: TemplateFnReturnType;
  richWarningRichContent: TemplateFnReturnType;
  dangerRichContent: TemplateFnReturnType;
  dangerWithHeadingsRichContent: TemplateFnReturnType;
}

export function storiesOfBanner<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    bannerTemplate,
    warningRichContent,
    richWarningRichContent,
    dangerRichContent,
    dangerWithHeadingsRichContent
  }: BannerParameters<TemplateFnReturnType>
) {
  const stories = storiesOf('Banner', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: bannerArgTypes
    });

  stories.add(
    'warning',
    bindTemplate(bannerArgsMapper, bannerTemplate),
    {
      args: {
        status: 'warning',
        richContent: warningRichContent
      }
    }
  );

  stories.add(
    'danger',
    bindTemplate<Banner<TemplateFnReturnType>, BannerArgs<TemplateFnReturnType>, TemplateFnReturnType>(bannerArgsMapper, bannerTemplate),
    {
      args: {
        status: 'danger',
        richContent: dangerRichContent
      }
    }
  );

  stories.add(
    'rich warning',
    bindTemplate<Banner<TemplateFnReturnType>, BannerArgs<TemplateFnReturnType>, TemplateFnReturnType>(bannerArgsMapper, bannerTemplate),
    {
      args: {
        status: 'warning',
        richContent: richWarningRichContent
      }
    }
  );

  stories.add(
    'danger with headings',
    bindTemplate<Banner<TemplateFnReturnType>, BannerArgs<TemplateFnReturnType>, TemplateFnReturnType>(bannerArgsMapper, bannerTemplate),
    {
      args: {
        status: 'danger',
        richContent: dangerWithHeadingsRichContent
      }
    }
  );
}
