import { storiesOfDropdownMenu } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import cssReadme from '@dso-toolkit/css/src/components/dropdown-menu/readme.md';
import coreReadme from '@dso-toolkit/core/src/components/dropdown-menu/readme.md';

import { StoryRoot } from '@dso-toolkit/sources/src/storybook';
import { templateContainer } from '../../templates';

storiesOfDropdownMenu(
  {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  templateContainer,
  ({ dropdownMenuTemplate }) => ({ dropdownMenuTemplate })
);

storiesOfDropdownMenu(
  {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core
  },
  templateContainer,
  ({ dropdownMenuTemplate }) => ({ dropdownMenuTemplate })
);
