import { storiesOfToggletip } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";

import readme from "@dso-toolkit/core/src/components/toggletip/readme.md";
import { toggletipTemplate } from "@dso-toolkit/core/src/components/toggletip/toggletip.template";
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfToggletip(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.Core
  },
  {
    toggletipTemplate,
  }
);
