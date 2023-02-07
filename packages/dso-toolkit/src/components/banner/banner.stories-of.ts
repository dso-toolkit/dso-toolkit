import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

import { BannerArgs, bannerArgsMapper, bannerArgTypes } from "./banner.args.js";
import { Banner } from "./banner.models.js";

export interface BannerTemplates<TemplateFnReturnType> {
  bannerTemplate: (bannerProperties: Banner<TemplateFnReturnType>) => TemplateFnReturnType;
  dangerRichContent: TemplateFnReturnType;
  errorRichContent: TemplateFnReturnType;
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
      "error",
      templateMapper<BannerArgs>((args, { bannerTemplate, errorRichContent }) =>
        bannerTemplate(bannerArgsMapper(args, errorRichContent))
      ),
      {
        args: {
          status: "error",
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

    return stories;
  });
}
