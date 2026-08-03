import type { Meta } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/definition-list/readme.md?raw";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import { DefinitionListArgs, definitionListArgTypes, definitionListArgsMapper } from "./definition-list.args.js";
import {
  columnDefinitions,
  definitions,
  definitionsSrOnlyColon,
  listDefinitions,
  smallContentDefinitions,
} from "./definition-list.content.js";
import { definitionListTemplate } from "./definition-list.template.js";

type DefinitionListStory = StoryObj<DefinitionListArgs, Renderer>;

const meta: Meta<DefinitionListArgs> = {
  title: "HTML|CSS/Definition List",
  argTypes: definitionListArgTypes,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Default: DefinitionListStory = {
  render: (args: DefinitionListArgs) => definitionListTemplate(definitionListArgsMapper(args, definitions)),
};

export const Bordered: DefinitionListStory = {
  args: {
    modifier: "dso-bordered",
  },
  render: (args: DefinitionListArgs) => definitionListTemplate(definitionListArgsMapper(args, definitionsSrOnlyColon)),
};
export const ColumnVariantOneThree: DefinitionListStory = {
  args: {
    modifier: "dso-columns-1-3 dso-with-header",
  },
  render: (args: DefinitionListArgs) => definitionListTemplate(definitionListArgsMapper(args, columnDefinitions)),
};
export const ColumnVariantThreeOne: DefinitionListStory = {
  args: {
    modifier: "dso-columns-3-1",
  },
  render: (args: DefinitionListArgs) => definitionListTemplate(definitionListArgsMapper(args, columnDefinitions)),
};
export const ColumnVariantTwoTwo: DefinitionListStory = {
  args: {
    modifier: "dso-columns-2-2 dso-with-header",
  },
  render: (args: DefinitionListArgs) => definitionListTemplate(definitionListArgsMapper(args, columnDefinitions)),
};
export const ColumnsList: DefinitionListStory = {
  args: {
    modifier: "dso-columns-list",
  },
  render: (args: DefinitionListArgs) => definitionListTemplate(definitionListArgsMapper(args, listDefinitions)),
};
export const EmphasizeDescription: DefinitionListStory = {
  args: {
    modifier: "dso-emphasize-description",
  },
  render: (args: DefinitionListArgs) => definitionListTemplate(definitionListArgsMapper(args, definitions)),
};
export const Inline: DefinitionListStory = {
  args: {
    modifier: "dso-inline",
  },
  render: (args: DefinitionListArgs) => definitionListTemplate(definitionListArgsMapper(args, definitionsSrOnlyColon)),
};
export const InlineEnd: DefinitionListStory = {
  args: {
    modifier: "dso-inline-end",
  },
  render: (args: DefinitionListArgs) => definitionListTemplate(definitionListArgsMapper(args, definitionsSrOnlyColon)),
};
export const ThreeColumns: DefinitionListStory = {
  args: {
    modifier: "dso-columns dso-3-columns",
  },
  render: (args: DefinitionListArgs) => definitionListTemplate(definitionListArgsMapper(args, definitions)),
};
export const ThreeColumnsSmall: DefinitionListStory = {
  args: {
    modifier: "dso-columns dso-3-columns",
  },
  render: (args: DefinitionListArgs) => definitionListTemplate(definitionListArgsMapper(args, smallContentDefinitions)),
};
export const TwoColumns: DefinitionListStory = {
  args: {
    modifier: "dso-columns dso-2-columns",
  },
  render: (args: DefinitionListArgs) => definitionListTemplate(definitionListArgsMapper(args, definitions)),
};
export const TwoColumnsSmall: DefinitionListStory = {
  args: {
    modifier: "dso-columns dso-2-columns",
  },
  render: (args: DefinitionListArgs) => definitionListTemplate(definitionListArgsMapper(args, smallContentDefinitions)),
};
export const Vertical: DefinitionListStory = {
  args: {
    modifier: "dso-vertical",
  },
  render: (args: DefinitionListArgs) => definitionListTemplate(definitionListArgsMapper(args, definitions)),
};
export const VerticalWithEmphasizeDescription: DefinitionListStory = {
  args: {
    modifier: "dso-vertical dso-emphasize-description",
  },
  render: (args: DefinitionListArgs) => definitionListTemplate(definitionListArgsMapper(args, definitions)),
};
