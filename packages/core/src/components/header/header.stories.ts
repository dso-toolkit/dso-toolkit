import { storiesOfHeader } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";
import readme from "./readme.md";
import { headerTemplate } from "./header.template";

storiesOfHeader(
  {
    module,
    storiesOf,
    readme,
  },
  {
    headerTemplate,
  }
);
