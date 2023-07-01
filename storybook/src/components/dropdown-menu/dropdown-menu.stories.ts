import { storiesOfDropdownMenu, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/dropdown-menu/readme.md?raw";
import coreReadme from "@dso-toolkit/core/src/components/dropdown-menu/readme.md?raw";

import { templateContainer } from "../../templates";

storiesOfDropdownMenu({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ dropdownMenuTemplate }) => ({ dropdownMenuTemplate }),
});

storiesOfDropdownMenu({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ dropdownMenuTemplate }) => ({ dropdownMenuTemplate }),
});
