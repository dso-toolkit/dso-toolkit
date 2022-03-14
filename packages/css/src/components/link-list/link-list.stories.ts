import { storiesOfLinkList } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { linkListTemplate, inFooterTemplate, inHighlightBoxTemplate } from './link-list.template';
import readme from './readme.md';

storiesOfLinkList(
  {
    module,
    storiesOf,
    readme
  },
  {
    linkListTemplate,
    inHighlightBoxTemplate,
    inFooterTemplate
  }
);
