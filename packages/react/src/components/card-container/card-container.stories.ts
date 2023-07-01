import { storiesOfCardContainer } from "dso-toolkit";
import { storiesOf } from "@storybook/react";

import readme from "./readme.md?raw";

import { templateContainer } from "../../templates";
import { content } from "./card-container.content";

storiesOfCardContainer({
  parameters: {
    module,
    storiesOf,
    readme,
  },
  templateContainer,
  storyTemplates: ({ cardContainerTemplate }) => ({ cardContainerTemplate, content }),
});
