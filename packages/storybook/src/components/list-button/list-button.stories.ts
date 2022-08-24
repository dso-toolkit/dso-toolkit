import { storiesOfListButton } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { listButtonTemplate } from '@dso-toolkit/css/src/components/list-button/list-button.template';
import readme from '@dso-toolkit/css/src/components/list-button/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfListButton(
  {
    storiesOf,
    module,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    listButtonTemplate
  }
);
