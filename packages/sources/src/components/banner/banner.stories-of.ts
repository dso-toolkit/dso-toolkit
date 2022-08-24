import { bindTemplate, createStories, StorybookParameters } from '../../storybook';

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
  parameters: StorybookParameters,
  {
    bannerTemplate,
    warningRichContent,
    richWarningRichContent,
    dangerRichContent,
    dangerWithHeadingsRichContent
  }: BannerParameters<TemplateFnReturnType>
) {
  const stories = createStories('Banner', parameters, bannerArgTypes);
  const template = bindTemplate(bannerArgsMapper, bannerTemplate);

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
