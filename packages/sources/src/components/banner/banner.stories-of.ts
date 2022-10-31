import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";

import { BannerArgs, bannerArgsMapper, bannerArgTypes } from "./banner.args";
import { Banner } from "./banner.models";

export interface BannerTemplates<TemplateFnReturnType> {
  bannerTemplate: (bannerProperties: Banner<TemplateFnReturnType>) => TemplateFnReturnType;
  dangerRichContent: TemplateFnReturnType;
  warningRichContent: TemplateFnReturnType;
  richWarningRichContent: TemplateFnReturnType;
  dangerWithHeadingsRichContent: TemplateFnReturnType;
}

export function storiesOfBanner<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    BannerTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Banner", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: bannerArgTypes,
    });

    stories.add(
      "danger",
      templateMapper<BannerArgs>((args, { bannerTemplate, dangerRichContent }) =>
        bannerTemplate(bannerArgsMapper(args, dangerRichContent))
      ),
      {
        args: {
          status: "danger",
        },
      }
    );

    stories.add(
      "warning",
      templateMapper<BannerArgs>((args, { bannerTemplate, warningRichContent }) =>
        bannerTemplate(bannerArgsMapper(args, warningRichContent))
      ),
      {
        args: {
          status: "warning",
        },
      }
    );

    stories.add(
      "rich warning",
      templateMapper<BannerArgs>((args, { bannerTemplate, richWarningRichContent }) =>
        bannerTemplate(bannerArgsMapper(args, richWarningRichContent))
      ),
      {
        args: {
          status: "danger",
        },
      }
    );

    stories.add(
      "danger with headings",
      templateMapper<BannerArgs>((args, { bannerTemplate, dangerWithHeadingsRichContent }) =>
        bannerTemplate(bannerArgsMapper(args, dangerWithHeadingsRichContent))
      ),
      {
        args: {
          status: "warning",
        },
      }
    );
  });
}
