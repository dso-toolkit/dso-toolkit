import type { Meta, StoryObj } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/link/readme.md?raw";
import { compiler } from "markdown-to-jsx/react";

import { LinkArgs, linkArgTypes, linkArgsMapper } from "./link.args.js";
import { linkTemplate } from "./link.template.js";

type LinkStory = StoryObj<LinkArgs>;

const meta: Meta<LinkArgs> = {
  title: "HTML|CSS/Link",
  argTypes: linkArgTypes,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
  render: (args) => linkTemplate(linkArgsMapper(args)),
};

export default meta;

export const Default: LinkStory = {
  args: {
    label: "Home",
    url: "#",
  },
};

export const DownloadLink: LinkStory = {
  args: {
    label: "Download Afvalkalender 2017",
    url: "afvalkalender.pdf",
    mode: "download",
  },
};

export const ExternalLink: LinkStory = {
  args: {
    label: "Een link naar Google",
    url: "http://www.google.nl",
    mode: "extern",
  },
};

export const LinkWithIcon: LinkStory = {
  args: {
    label: "Product zoeken",
    url: "#",
    icon: "search",
  },
};

export const MailLinkWithIcon: LinkStory = {
  args: {
    label: "noreply@dso-toolkit.nl",
    url: "mailto:no-reply@dso-toolkit.nl",
  },
};

export const PhoneLinkWithIcon: LinkStory = {
  args: {
    label: "Bel ons",
    url: "tel:012-34567891",
  },
};
