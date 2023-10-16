import type { Meta } from "@storybook/web-components";
import { BreadcrumbsArgs, breadcrumbsMeta, breadcrumbsStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "dso-toolkit/src/components/breadcrumbs/readme.md?raw";

const meta: Meta<BreadcrumbsArgs> = {
  ...breadcrumbsMeta({ readme }),
  component: "dso-breadcrumbs",
  title: "Breadcrumbs",
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
