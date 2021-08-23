import { storiesOfAutosuggest } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";

import { autosuggestTemplate } from "./autosuggest.template";
import readme from "./readme.md";

storiesOfAutosuggest(
  {
    module,
    storiesOf,
    readme,
  },
  {
    autosuggestTemplate,
  }
);
