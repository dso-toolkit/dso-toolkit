import { storiesOfDropdownMenu } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import * as css from '@dso-toolkit/css/src/components/dropdown-menu/dropdown-menu.template';
import cssReadme from '@dso-toolkit/css/src/components/dropdown-menu/readme.md';

import * as core from '@dso-toolkit/core/src/components/dropdown-menu/dropdown-menu.template';
import coreReadme from '@dso-toolkit/core/src/components/dropdown-menu/readme.md';

import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfDropdownMenu(
  {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  {
    dropdownMenuTemplate: css.dropdownMenuTemplate
  }
);

storiesOfDropdownMenu(
  {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core
  },
  {
    dropdownMenuTemplate: core.dropdownMenuTemplate
  }
);
