import readme from "@dso-toolkit/core/src/components/tooltip/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { TooltipArgs, tooltipMeta, tooltipStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { asChildTemplate, asSiblingTemplate } from "./tooltip.content";

const meta: Meta<TooltipArgs> = {
  ...tooltipMeta({ readme }),
  title: "Core/Tooltip (Deprecated)",
};

export default meta;

const { AsChild, AsSibling } = tooltipStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { tooltipTemplate } = templates;

    return {
      tooltipTemplate,
      asChildTemplate,
      asSiblingTemplate,
    };
  },
});

export { AsChild, AsSibling };
