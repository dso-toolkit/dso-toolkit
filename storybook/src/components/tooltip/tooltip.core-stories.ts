import type { Meta } from "@storybook/web-components";
import { TooltipArgs, tooltipMeta, tooltipStories } from "dso-toolkit";

import { asChildTemplate, asSiblingTemplate, headingContent, richContent } from "./tooltip.content";
import { templateContainer } from "../../templates";

import readme from "@dso-toolkit/core/src/components/tooltip/readme.md?raw";

const meta: Meta<TooltipArgs> = {
  ...tooltipMeta({ readme }),
  title: "Core/Tooltip",
};

export default meta;

const { AsChild, AsSibling, Onboarding } = tooltipStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { tooltipTemplate } = templates;

    return {
      tooltipTemplate,
      asChildTemplate,
      asSiblingTemplate,
      richContent: richContent(templates),
      headingContent: headingContent(templates),
    };
  },
});

export { AsChild, AsSibling, Onboarding };
