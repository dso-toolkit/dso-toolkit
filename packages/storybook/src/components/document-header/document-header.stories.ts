import { storiesOfDocumentHeader } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { documentHeaderTemplate } from '@dso-toolkit/css/src/components/document-header/document-header.template';
import readme from '@dso-toolkit/css/src/components/document-header/readme.md';

import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

import { features, status, statusContent } from './document-header.content';

storiesOfDocumentHeader(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    documentHeaderTemplate,
    features,
    status,
    statusContent
  }
);
