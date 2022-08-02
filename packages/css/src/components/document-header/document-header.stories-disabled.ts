import { storiesOfDocumentHeader } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { features, status, statusContent } from './document-header.content';
import { documentHeaderTemplate } from './document-header.template';
import readme from './readme.md';

storiesOfDocumentHeader(
  {
    module,
    storiesOf,
    readme
  },
  {
    documentHeaderTemplate,
    features,
    status,
    statusContent
  }
);
