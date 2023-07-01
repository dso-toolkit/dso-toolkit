import { storiesOf } from "@storybook/angular";

import { storiesOfToggletip } from "dso-toolkit";
import { DsoToggletip } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";
import { children } from "./toggletip.content";

import readme from "./readme.md?raw";

storiesOfToggletip({
  parameters: {
    module,
    storiesOf,
    readme,
    storyApiOptions: {
      parameters: [{ component: DsoToggletip }],
    },
  },
  templateContainer,
  storyTemplates: ({ toggletipTemplate }) => ({ toggletipTemplate, children }),
});
