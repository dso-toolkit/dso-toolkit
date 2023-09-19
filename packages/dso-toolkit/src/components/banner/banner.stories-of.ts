import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

import { BannerArgs, bannerArgsMapper, bannerArgTypes } from "./banner.args.js";
import { Banner } from "./banner.models.js";

export interface BannerTemplates<TemplateFnReturnType> {
  bannerTemplate: (bannerProperties: Banner<TemplateFnReturnType>) => TemplateFnReturnType;
  dangerRichContent: TemplateFnReturnType;
  errorRichContent: TemplateFnReturnType;
  infoRichContent: TemplateFnReturnType;
  infoCompactNonRemovableRichContent: TemplateFnReturnType;
  warningRichContent: TemplateFnReturnType;
  warningNonRemovableRichContent: TemplateFnReturnType;
  richWarningRichContent: TemplateFnReturnType;
  richInfoRichContent: TemplateFnReturnType;
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
      args: {
        closeButton: true,
      },
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
      "info",
      templateMapper<BannerArgs>((args, { bannerTemplate, infoRichContent }) =>
        bannerTemplate(bannerArgsMapper(args, infoRichContent))
      ),
      {
        args: {
          status: "info",
        },
      }
    );

    stories.add(
      "info compact non removable",
      templateMapper<BannerArgs>((args, { bannerTemplate, infoCompactNonRemovableRichContent }) =>
        bannerTemplate(bannerArgsMapper(args, infoCompactNonRemovableRichContent))
      ),
      {
        args: {
          status: "info",
          compact: true,
          noIcon: true,
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
      "info non removable",
      templateMapper<BannerArgs>((args, { bannerTemplate, infoRichContent }) =>
        bannerTemplate(bannerArgsMapper(args, infoRichContent))
      ),
      {
        args: {
          status: "info",
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
          status: "warning",
        },
      }
    );

    stories.add(
      "rich info",
      templateMapper<BannerArgs>((args, { bannerTemplate, richInfoRichContent }) =>
        bannerTemplate(bannerArgsMapper(args, richInfoRichContent))
      ),
      {
        args: {
          status: "info",
          compact: true,
          noIcon: true,
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
          status: "danger",
        },
      }
    );

    return stories;
  });
}
