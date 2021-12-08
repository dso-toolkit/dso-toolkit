import { storiesOfHelpcenterPanel } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";
import readme from "./readme.md";
import { helpcenterPanelTemplate } from "./helpcenter-panel.template";

storiesOfHelpcenterPanel(
  {
    module,
    storiesOf,
    readme,
  },
  {
    helpcenterPanelTemplate,
  }
);
