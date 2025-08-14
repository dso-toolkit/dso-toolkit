import type { Meta } from "@storybook/react-vite";
import { PaginationArgs, paginationMeta, paginationStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

const meta: Meta<PaginationArgs> = {
  ...paginationMeta({ readme }),
  title: "Pagination",
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
