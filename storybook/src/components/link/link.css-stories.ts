import type { Meta } from "@storybook/web-components-vite";
import { LinkArgs, linkMeta, linkStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/link/readme.md?raw";

import { linkTemplate } from "./link.css-template";

const meta: Meta<LinkArgs> = {
  ...linkMeta({ readme }),
  title: "HTML|CSS/Link",
};

export default meta;

const { Default, DownloadLink, ExternalLink, LinkWithIcon, MailLinkWithIcon, PhoneLinkWithIcon } = linkStories({
  storyTemplates: () => {
    return {
      linkTemplate,
    };
  },
});

export { Default, DownloadLink, ExternalLink, LinkWithIcon, MailLinkWithIcon, PhoneLinkWithIcon };
