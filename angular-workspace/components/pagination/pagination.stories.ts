import type { Meta } from "@storybook/angular";
import { PaginationArgs, paginationMeta, paginationStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";
import { DsoPagination } from "../../projects/component-library/src/public-api";

const meta: Meta<PaginationArgs> = {
  ...paginationMeta({ readme }),
  component: DsoPagination,
  title: "Pagination",
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
