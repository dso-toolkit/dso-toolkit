import { storiesOfToggletip } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/react";
import { templateContainer } from "../../templates";

import readme from "./readme.md";

storiesOfToggletip(
  {
    module,
    storiesOf,
    readme,
  },
  templateContainer,
  ({ toggletipTemplate }) => ({ toggletipTemplate })
);
