import { storiesOfTable, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import coreReadme from "@dso-toolkit/core/src/components/table/readme.md?raw";

import { templateContainer } from "../../templates";
import { defaultTable, imageOverlayTable, sortedAscendingTable, sortedDescendingTable } from "./table.content";

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
    sortedAscendingTable: sortedAscendingTable(templates),
    sortedDescendingTable: sortedDescendingTable(templates),
  }),
});
