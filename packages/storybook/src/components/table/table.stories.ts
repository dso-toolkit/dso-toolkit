import { storiesOfTable } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import * as core from '@dso-toolkit/core/src/components/table/table.template';
import coreReadme from '@dso-toolkit/core/src/components/table/readme.md';

import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfTable(
  {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core
  },
  {
    tableTemplate: core.tableTemplate,
  }
);
