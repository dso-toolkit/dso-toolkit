import { storiesOfJustifyFormGroups, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/justify-form-groups/readme.md?raw";

import { templateContainer } from "../../templates";
import { content } from "./justify-form-groups.content";

storiesOfJustifyFormGroups(
  {
    parameters: {
      storiesOf,
      module,
      readme: cssReadme,
      root: StoryRoot.HtmlCss,
    },
    templateContainer,
    storyTemplates: ({ justifyFormGroupsTemplate }) => ({ justifyFormGroupsTemplate }),
  },
  {
    content,
  },
);
