import type { Meta } from "@storybook/web-components";
import { AnchorArgs, anchorMeta, anchorStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "dso-toolkit/src/components/anchor/readme.md?raw";

const meta: Meta<AnchorArgs> = {
  ...anchorMeta({ readme }),
  title: "HTML|CSS/Anchor",
};

export default meta;

const { Default, DownloadLink, ExternalLink, LinkWithIcon, MailLinkWithIcon, PhoneLinkWithIcon } = anchorStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { anchorTemplate } = templates;

    return {
      anchorTemplate,
    };
  },
});

export { Default, DownloadLink, ExternalLink, LinkWithIcon, MailLinkWithIcon, PhoneLinkWithIcon };
