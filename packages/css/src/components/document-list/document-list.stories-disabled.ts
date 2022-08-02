import { storiesOfDocumentList } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { documentListStatusDemoContentMapper } from './document-list.mapper';
import { documentListTemplate } from './document-list.template';
import readme from './readme.md';

storiesOfDocumentList(
  {
    module,
    storiesOf,
    readme
  },
  {
    documentListTemplate,
    statusDemoMap: documentListStatusDemoContentMapper
  }
);
