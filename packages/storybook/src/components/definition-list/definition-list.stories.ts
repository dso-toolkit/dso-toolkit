import { storiesOfDefinitionList } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { definitionListTemplate } from '@dso-toolkit/css/src/components/definition-list/definition-list.template';
import readme from '@dso-toolkit/css/src/components/definition-list/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfDefinitionList(
  {
    storiesOf,
    module,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    definitionListTemplate
  }
);
