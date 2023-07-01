import { storiesOfSelectable } from "dso-toolkit";
import { storiesOf } from "@storybook/react";

import { templateContainer } from "../../templates";
import { infoRichContent } from "./selectable.content";

import readme from "./readme.md?raw";

storiesOfSelectable({
  parameters: {
    module,
    storiesOf,
    readme,
  },
  templateContainer,
  storyTemplates: ({ selectableTemplate }) => ({
    selectableTemplate,
    infoRichContent,
  }),
});
