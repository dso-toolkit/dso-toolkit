import { storiesOfHelpcenterPanel } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";
import readme from "@dso-toolkit/core/src/components/helpcenter-panel/readme.md";
import { helpcenterPanelTemplate } from "@dso-toolkit/core/src/components/helpcenter-panel/helpcenter-panel.template";
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfHelpcenterPanel(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.Core
  },
  {
    helpcenterPanelTemplate,
  }
);
