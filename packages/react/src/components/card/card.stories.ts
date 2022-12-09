import { storiesOfCard } from "dso-toolkit";
import { storiesOf } from "@storybook/react";
import { templateContainer } from "../../templates";

import { content } from "./card.content";

import readme from "./readme.md";

storiesOfCard({
  parameters: {
    module,
    storiesOf,
    readme,
  },
  templateContainer,
  storyTemplates: ({ cardTemplate }) => ({ cardTemplate, content }),
});
