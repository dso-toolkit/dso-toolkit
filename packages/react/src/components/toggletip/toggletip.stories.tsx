import { storiesOfToggletip } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/react";
import { templateContainer } from "../../templates";

import readme from "./readme.md";
import { children } from "./toggletip.content";

storiesOfToggletip({
  parameters: {
    module,
    storiesOf,
    readme,
  },
  templateContainer,
  storyTemplates: ({ toggletipTemplate }) => ({ toggletipTemplate, children }),
});
