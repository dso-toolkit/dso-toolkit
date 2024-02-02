import type { Meta } from "@storybook/web-components";
import { DefinitionListArgs, definitionListMeta, definitionListStories } from "dso-toolkit";

import { templateContainer } from "../../templates";
import {
  columnDefinitions,
  definitions,
  definitionsSrOnlyColon,
  listDefinitions,
  smallContentDefinitions,
} from "./definition-list.content";

import readme from "dso-toolkit/src/components/definition-list/readme.md?raw";

const meta: Meta<DefinitionListArgs> = {
  ...definitionListMeta({ readme }),
  title: "HTML|CSS/Definition List",
};

export default meta;

const {
  Default,
  Vertical,
  EmphasizeDescription,
  VerticalWithEmphasizeDescription,
  ColumnVariantOneThree,
  ColumnVariantTwoTwo,
  ColumnVariantThreeOne,
  TwoColumnsSmall,
  TwoColumns,
  ThreeColumnsSmall,
  ThreeColumns,
  Bordered,
  ColumnsList,
} = definitionListStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { definitionListTemplate } = templates;

    return {
      definitionListTemplate,
      definitions,
      definitionsSrOnlyColon,
      columnDefinitions,
      smallContentDefinitions,
      listDefinitions,
    };
  },
});

export {
  Default,
  Vertical,
  EmphasizeDescription,
  VerticalWithEmphasizeDescription,
  ColumnVariantOneThree,
  ColumnVariantTwoTwo,
  ColumnVariantThreeOne,
  TwoColumnsSmall,
  TwoColumns,
  ThreeColumnsSmall,
  ThreeColumns,
  Bordered,
  ColumnsList,
};
