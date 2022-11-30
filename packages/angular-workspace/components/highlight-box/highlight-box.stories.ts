import { storiesOf, moduleMetadata } from "@storybook/angular";

import { storiesOfHighlightBox } from "../../../sources";
import { DsoHighlightBox, DsoIcon } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";
import { content } from "./highlight-box.content";

import readme from "./readme.md";

storiesOfHighlightBox(
  {
    parameters: {
      module,
      storiesOf,
      readme,
    },
    templateContainer,
    storyTemplates: ({ highlightBoxTemplate }, templates) => ({ highlightBoxTemplate, content: content(templates) }),
  },
  { component: DsoHighlightBox },
  moduleMetadata({
    declarations: [DsoIcon],
  })
);
