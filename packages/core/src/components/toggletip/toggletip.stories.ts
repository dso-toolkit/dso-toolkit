import { storiesOfToggletip } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";

import readme from "./readme.md";
import { toggletipTemplate } from "./toggletip.template";

storiesOfToggletip(
  {
    module,
    storiesOf,
    readme,
  },
  {
    toggletipTemplate,
    children: "",
  }
);
