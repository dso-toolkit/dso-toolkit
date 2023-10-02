import type { Meta } from "@storybook/web-components";
import { anchorArgTypes, anchorStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

const meta: Meta = {
  component: "dso-anchor",
  title: "HTML|CSS/Anchor",
  argTypes: anchorArgTypes,
};

export default meta;

const { Default, DownloadLink, ExternalLink, LinkWithIcon } = anchorStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { anchorTemplate } = templates;

    return {
      anchorTemplate,
    };
  },
});

export { Default, DownloadLink, ExternalLink, LinkWithIcon };
