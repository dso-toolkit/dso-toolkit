import type { Meta } from "@storybook/web-components";
import { breadcrumbsArgTypes, breadcrumbsStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

const meta: Meta = {
  component: "dso-breadcrumbs",
  title: "HTML|CSS/Breadcrumbs",
  argTypes: breadcrumbsArgTypes,
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
