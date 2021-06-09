import { storiesOfDefinitionList } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { definitionListTemplate } from './definition-list.template';
import readme from './readme.md';

storiesOfDefinitionList(
  {
    storiesOf,
    module,
    readme
  },
  {
    definitionListTemplate
  }
);
