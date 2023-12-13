import { storiesOfTable } from "dso-toolkit";
import { storiesOf } from "@storybook/react";
import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";
import { defaultTable, imageOverlayTable, sortedAscendingTable, sortedDescendingTable } from "./table.content";

storiesOfTable({
  parameters: {
    module,
    storiesOf,
    readme,
  },
  templateContainer,
  storyTemplates: ({ tableTemplate }) => ({
    tableTemplate,
    defaultTable,
    imageOverlayTable,
    sortedAscendingTable,
    sortedDescendingTable,
  }),
});
