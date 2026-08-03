import readme from "@dso-toolkit/core/src/components/pagination/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { StoryObj } from "../../shared/story-obj.js";

import { PaginationArgs, paginationArgTypes, paginationArgsMapper } from "./pagination.args.js";
import { paginationTemplate } from "./pagination.template.js";

type PaginationStory = StoryObj<PaginationArgs, Renderer>;

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
};

export default meta;

const render = (args: PaginationArgs) => paginationTemplate(paginationArgsMapper(args));

export const Pagination: PaginationStory = {
  args: {
    totalPages: 16,
    currentPage: 8,
  },
  render,
};

export const PaginationWithoutTotal: PaginationStory = {
  args: {
    currentPage: 8,
  },
  render,
};
