import { storiesOfDocumentList } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { documentListTemplate } from '@dso-toolkit/css/src/components/document-list/document-list.template';
import readme from '@dso-toolkit/css/src/components/document-list/readme.md';
import { documentListStatusDemoContentMapper } from './document-list.content';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfDocumentList(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    documentListTemplate,
    statusDemoMap: documentListStatusDemoContentMapper
  }
);
