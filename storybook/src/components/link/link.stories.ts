import type { Meta } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/link/readme.md?raw";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import { LinkArgs, linkArgTypes, linkArgsMapper } from "./link.args.js";
import { linkTemplate } from "./link.template.js";

type LinkStory = StoryObj<LinkArgs, Renderer>;

const meta: Meta<LinkArgs> = {
  title: "HTML|CSS/Link",
  argTypes: linkArgTypes,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

const render = (args: LinkArgs) => linkTemplate(linkArgsMapper(args));

export const Default: LinkStory = {
  args: {
    label: "Home",
    url: "#",
  },
  render,
};

export const DownloadLink: LinkStory = {
  args: {
    label: "Download Afvalkalender 2017",
    url: "afvalkalender.pdf",
    mode: "download",
  },
  render,
};

export const ExternalLink: LinkStory = {
  args: {
    label: "Een link naar Google",
    url: "http://www.google.nl",
    mode: "extern",
  },
  render,
};

export const LinkWithIcon: LinkStory = {
  args: {
    label: "Product zoeken",
    url: "#",
    icon: "search",
  },
  render,
};

export const MailLinkWithIcon: LinkStory = {
  args: {
    label: "noreply@dso-toolkit.nl",
    url: "mailto:no-reply@dso-toolkit.nl",
  },
  render,
};

export const PhoneLinkWithIcon: LinkStory = {
  args: {
    label: "Bel ons",
    url: "tel:012-34567891",
  },
  render,
};
