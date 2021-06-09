import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { bannerArgsMapper, bannerArgTypes } from './banner.args';
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
  const template = bindTemplate(bannerArgsMapper, bannerTemplate);

  const stories = storiesOf('Banner', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: bannerArgTypes
    });

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
}
