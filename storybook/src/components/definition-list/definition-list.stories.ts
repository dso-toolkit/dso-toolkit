import { storiesOfDefinitionList, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/definition-list/readme.md";

import { templateContainer } from "../../templates";
import {
  columnDefinitions,
  definitions,
  definitionsSrOnlyColon,
  listDefinitions,
  smallContentDefinitions,
} from "./definition-list.content";

storiesOfDefinitionList({
  parameters: {
    storiesOf,
    module,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ definitionListTemplate }) => ({
    definitionListTemplate,
    definitions,
    definitionsSrOnlyColon,
    columnDefinitions,
    smallContentDefinitions,
    listDefinitions,
  }),
});
