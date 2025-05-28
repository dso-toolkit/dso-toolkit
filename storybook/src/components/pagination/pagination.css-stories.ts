import type { Meta } from "@storybook/web-components";
import { PaginationArgs, paginationMeta, paginationStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/pagination/readme.md?raw";

import { templateContainer } from "../../templates";

const meta: Meta<PaginationArgs> = {
  ...paginationMeta({ readme }),
  title: "HTML|CSS/Pagination (Deprecated)",
};

export default meta;

const { Pagination } = paginationStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { paginationTemplate } = templates;

    return {
      paginationTemplate,
    };
  },
});

export { Pagination };
