import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

import { BannerArgs, bannerArgsMapper, bannerArgTypes } from "./banner.args.js";
import { Banner } from "./banner.models.js";

export interface BannerTemplates<TemplateFnReturnType> {
  bannerTemplate: (bannerProperties: Banner<TemplateFnReturnType>) => TemplateFnReturnType;
  inGrid: (children: TemplateFnReturnType) => TemplateFnReturnType;
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
        inGrid: true,
      },
    });

    stories.add(
      "danger",
      templateMapper<BannerArgs>((args, { bannerTemplate, inGrid, dangerRichContent }) =>
        bannerTemplate(bannerArgsMapper(args, inGrid, dangerRichContent))
      ),
      {
        args: {
          status: "danger",
        },
      }
    );

    stories.add(
      "error",
      templateMapper<BannerArgs>((args, { bannerTemplate, inGrid, errorRichContent }) =>
        bannerTemplate(bannerArgsMapper(args, inGrid, errorRichContent))
      ),
      {
        args: {
          status: "error",
        },
      }
    );

    stories.add(
      "info",
      templateMapper<BannerArgs>((args, { bannerTemplate, inGrid, infoRichContent }) =>
        bannerTemplate(bannerArgsMapper(args, inGrid, infoRichContent))
      ),
      {
        args: {
          status: "info",
        },
      }
    );

    stories.add(
      "info compact non removable",
      templateMapper<BannerArgs>((args, { bannerTemplate, inGrid, infoCompactNonRemovableRichContent }) =>
        bannerTemplate(bannerArgsMapper(args, inGrid, infoCompactNonRemovableRichContent))
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
      templateMapper<BannerArgs>((args, { bannerTemplate, inGrid, warningRichContent }) =>
        bannerTemplate(bannerArgsMapper(args, inGrid, warningRichContent))
      ),
      {
        args: {
          status: "warning",
        },
      }
    );

    stories.add(
      "info non removable",
      templateMapper<BannerArgs>((args, { bannerTemplate, inGrid, infoRichContent }) =>
        bannerTemplate(bannerArgsMapper(args, inGrid, infoRichContent))
      ),
      {
        args: {
          status: "info",
        },
      }
    );

    stories.add(
      "rich warning",
      templateMapper<BannerArgs>((args, { bannerTemplate, inGrid, richWarningRichContent }) =>
        bannerTemplate(bannerArgsMapper(args, inGrid, richWarningRichContent))
      ),
      {
        args: {
          status: "warning",
        },
      }
    );

    stories.add(
      "rich info",
      templateMapper<BannerArgs>((args, { bannerTemplate, inGrid, richInfoRichContent }) =>
        bannerTemplate(bannerArgsMapper(args, inGrid, richInfoRichContent))
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
      templateMapper<BannerArgs>((args, { bannerTemplate, inGrid, dangerWithHeadingsRichContent }) =>
        bannerTemplate(bannerArgsMapper(args, inGrid, dangerWithHeadingsRichContent))
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
