import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import { BannerArgs, bannerArgTypes, bannerArgsMapper } from "./banner.args.js";
import { Banner } from "./banner.models.js";

type BannerStory = StoryObj<BannerArgs, Renderer>;

interface BannerStories {
  Error: BannerStory;
  Info: BannerStory;
  InfoCompactNonRemovable: BannerStory;
  Warning: BannerStory;
  InfoNonRemovable: BannerStory;
  RichWarning: BannerStory;
  RichInfo: BannerStory;
  Success: BannerStory;
}

interface BannerStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, BannerTemplates<TemplateFnReturnType>> {}

interface BannerTemplates<TemplateFnReturnType> {
  bannerTemplate: (bannerProperties: Banner<TemplateFnReturnType>) => TemplateFnReturnType;
  errorRichContent: TemplateFnReturnType;
  infoRichContent: TemplateFnReturnType;
  infoCompactNonRemovableRichContent: TemplateFnReturnType;
  warningRichContent: TemplateFnReturnType;
  warningNonRemovableRichContent: TemplateFnReturnType;
  richWarningRichContent: TemplateFnReturnType;
  richInfoRichContent: TemplateFnReturnType;
  successRichContent: TemplateFnReturnType;
}

export function bannerMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  BannerArgs
> {
  return {
    argTypes: bannerArgTypes,
    args: {
      icon: true,
    },
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
    Success: {
      ...bannerMeta(),
      args: {
        status: "success",
      },
      render: templateContainer.render(storyTemplates, (args, { bannerTemplate, successRichContent }) =>
        bannerTemplate(bannerArgsMapper(args, successRichContent)),
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
        icon: false,
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
        icon: false,
      },
      render: templateContainer.render(storyTemplates, (args, { bannerTemplate, richInfoRichContent }) =>
        bannerTemplate(bannerArgsMapper(args, richInfoRichContent)),
      ),
    },
  };
}
