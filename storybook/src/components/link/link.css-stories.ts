import type { Meta } from "@storybook/web-components";
import { LinkArgs, linkMeta, linkStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/link/readme.md?raw";

import { templateContainer } from "../../templates";

const meta: Meta<LinkArgs> = {
  ...linkMeta({ readme }),
  title: "HTML|CSS/Link",
};

export default meta;

const { Default, DownloadLink, ExternalLink, LinkWithIcon, MailLinkWithIcon, PhoneLinkWithIcon } = linkStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { linkTemplate } = templates;

    return {
      linkTemplate,
    };
  },
});

export { Default, DownloadLink, ExternalLink, LinkWithIcon, MailLinkWithIcon, PhoneLinkWithIcon };
