import { storiesOfSelectable } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/react";

import { templateContainer } from "../../templates";
import { infoRichContent } from "./selectable.content";

import readme from "./readme.md";

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
