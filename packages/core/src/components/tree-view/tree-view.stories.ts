import { storiesOfTreeView } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { treeViewTemplate } from './tree-view.template';
import readme from './readme.md';

storiesOfTreeView(
  {
    module,
    storiesOf,
    readme
  },
  {
    treeViewTemplate
  }
);
