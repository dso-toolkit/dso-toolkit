import type { Meta } from "@storybook/web-components";
import { BreadcrumbsArgs, breadcrumbsMeta, breadcrumbsStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/breadcrumbs/readme.md?raw";

import { templateContainer } from "../../templates";

const meta: Meta<BreadcrumbsArgs> = {
  ...breadcrumbsMeta({ readme }),
  title: "HTML|CSS/Breadcrumbs",
};

export default meta;

const { Breadcrumb } = breadcrumbsStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { breadcrumbsTemplate } = templates;

    return {
      breadcrumbsTemplate,
    };
  },
});

export { Breadcrumb };
