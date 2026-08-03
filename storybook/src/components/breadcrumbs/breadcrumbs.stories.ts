import type { Meta } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/breadcrumbs/readme.md?raw";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import { BreadcrumbsArgs, breadcrumbsArgTypes, breadcrumbsArgsMapper } from "./breadcrumbs.args.js";
import { breadcrumbsTemplate } from "./breadcrumbs.template.js";

type BreadcrumbsStory = StoryObj<BreadcrumbsArgs, Renderer>;

const meta: Meta<BreadcrumbsArgs> = {
  title: "HTML|CSS/Breadcrumbs",
  argTypes: breadcrumbsArgTypes,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Breadcrumbs: BreadcrumbsStory = {
  args: {
    breadcrumbs: [
      {
        label: "Home",
        url: "#",
      },
      {
        label: "Zelf aan de slag",
        url: "#",
      },
      {
        label: "Inhoud",
      },
    ],
  },
  render: (args: BreadcrumbsArgs) => breadcrumbsTemplate(breadcrumbsArgsMapper(args)),
};
