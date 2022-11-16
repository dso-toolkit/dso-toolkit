import { storiesOfTable } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";

import coreReadme from "@dso-toolkit/core/src/components/table/readme.md";

import { StoryRoot } from "@dso-toolkit/sources/src/storybook";
import { templateContainer } from "../../templates";
import { defaultTable, imageOverlayTable } from "./table.content";

storiesOfTable({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ tableTemplate }, templates) => ({
    tableTemplate,
    defaultTable: defaultTable(templates),
    imageOverlayTable: imageOverlayTable(templates),
  }),
});
