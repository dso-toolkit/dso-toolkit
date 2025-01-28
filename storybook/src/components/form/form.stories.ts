import { storiesOfForm, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import readme from "dso-toolkit/src/components/form/readme.md?raw";

import { templateContainer } from "../../templates";

storiesOfForm(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  ({ formTemplate }) => ({
    formTemplate,
  }),
);
