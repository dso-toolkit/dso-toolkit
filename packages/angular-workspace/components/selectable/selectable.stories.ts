import { storiesOf } from "@storybook/angular";

import { storiesOfSelectable } from "../../../sources";
import { DsoSelectable } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";
import { infoRichContent } from "./selectable.content";

import readme from "./readme.md";

storiesOfSelectable({
  parameters: {
    module,
    storiesOf,
    readme,
    storyApiOptions: {
      parameters: [{ component: DsoSelectable }],
    },
  },
  templateContainer,
  storyTemplates: ({ selectableTemplate }) => ({ selectableTemplate, infoRichContent }),
});
