import readme from "@dso-toolkit/core/src/components/pagination/readme.md?raw";
import { Meta, StoryObj } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { fn } from "storybook/test";

import { PaginationArgs, paginationArgTypes, paginationArgsMapper } from "./pagination.args.js";
import { paginationTemplate } from "./pagination.template.js";

type PaginationStory = StoryObj<PaginationArgs>;

const meta: Meta<PaginationArgs> = {
  title: "Core/Pagination",
  argTypes: paginationArgTypes,
  args: {
    dsoSelectPage: fn(),
  },
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
  render: (args) => paginationTemplate(paginationArgsMapper(args)),
};

export default meta;

export const Pagination: PaginationStory = {
  args: {
    totalPages: 16,
    currentPage: 8,
  },
};

export const PaginationWithoutTotal: PaginationStory = {
  args: {
    currentPage: 8,
  },
};
