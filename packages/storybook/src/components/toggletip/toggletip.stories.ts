import { storiesOfToggletip } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "@dso-toolkit/core/src/components/toggletip/readme.md";

import { StoryRoot } from '@dso-toolkit/sources/src/storybook';
import { templateContainer } from "../../templates";

storiesOfToggletip(
  {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.Core
  },
  templateContainer,
  ({ toggletipTemplate }) => ({ toggletipTemplate })
);
