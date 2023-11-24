import { ComponentAnnotations, Renderer } from "@storybook/types";

import { BannerArgs, bannerArgTypes, bannerArgsMapper } from "./banner.args.js";
import { Banner } from "./banner.models.js";

import { StoriesParameters, StoryObj } from "../../template-container.js";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface.js";

type BannerStory = StoryObj<BannerArgs, Renderer>;

interface BannerStories {
  Danger: BannerStory;
  Error: BannerStory;
  Info: BannerStory;
  InfoCompactNonRemovable: BannerStory;
  Warning: BannerStory;
  InfoNonRemovable: BannerStory;
  RichWarning: BannerStory;
  RichInfo: BannerStory;
  DangerWithHeadings: BannerStory;
}

interface BannerStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, BannerTemplates<TemplateFnReturnType>> {}

interface BannerTemplates<TemplateFnReturnType> {
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

export function bannerMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  BannerArgs
> {
  return {
    argTypes: bannerArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function bannerStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: BannerStoriesParameters<Implementation, Templates, TemplateFnReturnType>): BannerStories {
  return {
    Danger: {
      args: {
        status: "danger",
      },
      render: templateContainer.render(storyTemplates, (args, { bannerTemplate, dangerRichContent }) =>
        bannerTemplate(bannerArgsMapper(args, dangerRichContent)),
      ),
    },
    Error: {
      args: {
        status: "error",
      },
      render: templateContainer.render(storyTemplates, (args, { bannerTemplate, errorRichContent }) =>
        bannerTemplate(bannerArgsMapper(args, errorRichContent)),
      ),
    },
    Info: {
      args: {
        status: "info",
      },
      render: templateContainer.render(storyTemplates, (args, { bannerTemplate, infoRichContent }) =>
        bannerTemplate(bannerArgsMapper(args, infoRichContent)),
      ),
    },
    InfoCompactNonRemovable: {
      args: {
        status: "info",
        compact: true,
        noIcon: true,
      },
      render: templateContainer.render(storyTemplates, (args, { bannerTemplate, infoCompactNonRemovableRichContent }) =>
        bannerTemplate(bannerArgsMapper(args, infoCompactNonRemovableRichContent)),
      ),
    },
    Warning: {
      args: {
        status: "warning",
      },
      render: templateContainer.render(storyTemplates, (args, { bannerTemplate, warningRichContent }) =>
        bannerTemplate(bannerArgsMapper(args, warningRichContent)),
      ),
    },
    InfoNonRemovable: {
      args: {
        status: "info",
      },
      render: templateContainer.render(storyTemplates, (args, { bannerTemplate, infoRichContent }) =>
        bannerTemplate(bannerArgsMapper(args, infoRichContent)),
      ),
    },
    RichWarning: {
      args: {
        status: "warning",
      },
      render: templateContainer.render(storyTemplates, (args, { bannerTemplate, richWarningRichContent }) =>
        bannerTemplate(bannerArgsMapper(args, richWarningRichContent)),
      ),
    },
    RichInfo: {
      args: {
        status: "info",
        compact: true,
        noIcon: true,
      },
      render: templateContainer.render(storyTemplates, (args, { bannerTemplate, richInfoRichContent }) =>
        bannerTemplate(bannerArgsMapper(args, richInfoRichContent)),
      ),
    },
    DangerWithHeadings: {
      args: {
        status: "danger",
      },
      render: templateContainer.render(storyTemplates, (args, { bannerTemplate, dangerWithHeadingsRichContent }) =>
        bannerTemplate(bannerArgsMapper(args, dangerWithHeadingsRichContent)),
      ),
    },
  };
}
