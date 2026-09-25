import type { Meta, StoryObj } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/definition-list/readme.md?raw";
import { compiler } from "markdown-to-jsx/react";

import { DefinitionListArgs, definitionListArgTypes, definitionListArgsMapper } from "./definition-list.args.js";
import {
  columnDefinitions,
  definitions,
  definitionsSrOnlyColon,
  listDefinitions,
  smallContentDefinitions,
} from "./definition-list.content.js";
import { definitionListTemplate } from "./definition-list.template.js";

type DefinitionListStory = StoryObj<DefinitionListArgs>;

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
  render: (args) => definitionListTemplate(definitionListArgsMapper(args, definitions())),
};

export const Bordered: DefinitionListStory = {
  args: {
    modifier: "dso-bordered",
  },
  render: (args) => definitionListTemplate(definitionListArgsMapper(args, definitionsSrOnlyColon())),
};
export const ColumnVariantOneThree: DefinitionListStory = {
  args: {
    modifier: "dso-columns-1-3 dso-with-header",
  },
  render: (args) => definitionListTemplate(definitionListArgsMapper(args, columnDefinitions())),
};
export const ColumnVariantThreeOne: DefinitionListStory = {
  args: {
    modifier: "dso-columns-3-1",
  },
  render: (args) => definitionListTemplate(definitionListArgsMapper(args, columnDefinitions())),
};
export const ColumnVariantTwoTwo: DefinitionListStory = {
  args: {
    modifier: "dso-columns-2-2 dso-with-header",
  },
  render: (args) => definitionListTemplate(definitionListArgsMapper(args, columnDefinitions())),
};
export const ColumnsList: DefinitionListStory = {
  args: {
    modifier: "dso-columns-list",
  },
  render: (args) => definitionListTemplate(definitionListArgsMapper(args, listDefinitions())),
};
export const EmphasizeDescription: DefinitionListStory = {
  args: {
    modifier: "dso-emphasize-description",
  },
  render: (args) => definitionListTemplate(definitionListArgsMapper(args, definitions())),
};
export const Inline: DefinitionListStory = {
  args: {
    modifier: "dso-inline",
  },
  render: (args) => definitionListTemplate(definitionListArgsMapper(args, definitionsSrOnlyColon())),
};
export const InlineEnd: DefinitionListStory = {
  args: {
    modifier: "dso-inline-end",
  },
  render: (args) => definitionListTemplate(definitionListArgsMapper(args, definitionsSrOnlyColon())),
};
export const ThreeColumns: DefinitionListStory = {
  args: {
    modifier: "dso-columns dso-3-columns",
  },
  render: (args) => definitionListTemplate(definitionListArgsMapper(args, definitions())),
};
export const ThreeColumnsSmall: DefinitionListStory = {
  args: {
    modifier: "dso-columns dso-3-columns",
  },
  render: (args) => definitionListTemplate(definitionListArgsMapper(args, smallContentDefinitions())),
};
export const TwoColumns: DefinitionListStory = {
  args: {
    modifier: "dso-columns dso-2-columns",
  },
  render: (args) => definitionListTemplate(definitionListArgsMapper(args, definitions())),
};
export const TwoColumnsSmall: DefinitionListStory = {
  args: {
    modifier: "dso-columns dso-2-columns",
  },
  render: (args) => definitionListTemplate(definitionListArgsMapper(args, smallContentDefinitions())),
};
export const Vertical: DefinitionListStory = {
  args: {
    modifier: "dso-vertical",
  },
  render: (args) => definitionListTemplate(definitionListArgsMapper(args, definitions())),
};
export const VerticalWithEmphasizeDescription: DefinitionListStory = {
  args: {
    modifier: "dso-vertical dso-emphasize-description",
  },
  render: (args) => definitionListTemplate(definitionListArgsMapper(args, definitions())),
};
