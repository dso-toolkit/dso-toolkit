import type { Meta } from "@storybook/web-components";
import { PaginationArgs, paginationMeta, paginationStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "@dso-toolkit/core/src/components/pagination/readme.md?raw";

const meta: Meta<PaginationArgs> = {
  ...paginationMeta({ readme }),
  title: "Core/Pagination",
};

export default meta;

const { Pagination, PaginationWithoutTotal } = paginationStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { paginationTemplate } = templates;

    return {
      paginationTemplate,
    };
  },
});

export { Pagination, PaginationWithoutTotal };
