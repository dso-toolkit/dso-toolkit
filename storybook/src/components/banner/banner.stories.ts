import readme from "@dso-toolkit/core/src/components/banner/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import { BannerArgs, bannerArgTypes, bannerArgsMapper } from "./banner.args.js";
import {
  errorRichContent,
  infoCompactNonRemovableRichContent,
  infoRichContent,
  richInfoRichContent,
  richWarningRichContent,
  successRichContent,
  warningNonRemovableRichContent,
  warningRichContent,
} from "./banner.content.js";
import { bannerTemplate } from "./banner.template.js";

type BannerStory = StoryObj<BannerArgs, Renderer>;

const meta: Meta<BannerArgs> = {
  title: "Core/Banner",
  argTypes: bannerArgTypes,
  args: {
    icon: true,
  },
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Success: BannerStory = {
  args: {
    status: "success",
  },
  render: (args: BannerArgs) => bannerTemplate(bannerArgsMapper(args, successRichContent())),
};

export const Error: BannerStory = {
  args: {
    status: "error",
  },
  render: (args: BannerArgs) => bannerTemplate(bannerArgsMapper(args, errorRichContent())),
};

export const Info: BannerStory = {
  args: {
    status: "info",
  },
  render: (args: BannerArgs) => bannerTemplate(bannerArgsMapper(args, infoRichContent())),
};

export const InfoCompactNonRemovable: BannerStory = {
  args: {
    status: "info",
    compact: true,
    icon: false,
  },
  render: (args: BannerArgs) => bannerTemplate(bannerArgsMapper(args, infoCompactNonRemovableRichContent())),
};

export const Warning: BannerStory = {
  args: {
    status: "warning",
  },
  render: (args: BannerArgs) => bannerTemplate(bannerArgsMapper(args, warningRichContent())),
};

export const InfoNonRemovable: BannerStory = {
  args: {
    status: "info",
  },
  render: (args: BannerArgs) => bannerTemplate(bannerArgsMapper(args, warningNonRemovableRichContent())),
};

export const RichWarning: BannerStory = {
  args: {
    status: "warning",
  },
  render: (args: BannerArgs) => bannerTemplate(bannerArgsMapper(args, richWarningRichContent())),
};

export const RichInfo: BannerStory = {
  args: {
    status: "info",
    compact: true,
    icon: false,
  },
  render: (args: BannerArgs) => bannerTemplate(bannerArgsMapper(args, richInfoRichContent())),
};
