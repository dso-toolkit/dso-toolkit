import { storiesOfLabel } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "@dso-toolkit/css/src/components/label/readme.md";
import coreReadme from "@dso-toolkit/core/src/components/label/readme.md";

import { decorator } from "./label.decorator";
import { StoryRoot } from "@dso-toolkit/sources/src/storybook";
import { templateContainer } from "../../templates";

storiesOfLabel(
  {
    parameters: {
      module,
      storiesOf,
      readme: cssReadme,
      root: StoryRoot.HtmlCss,
    },
    templateContainer,
    storyTemplates: ({ labelTemplate }) => ({ labelTemplate }),
  },
  {
    decorator,
  }
);

storiesOfLabel(
  {
    parameters: {
      module,
      storiesOf,
      readme: coreReadme,
      root: StoryRoot.Core,
    },
    templateContainer,
    storyTemplates: ({ labelTemplate }) => ({ labelTemplate }),
  },
  {
    decorator,
  }
);
