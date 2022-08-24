import { storiesOfLinkList } from '@dso-toolkit/sources';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';
import { storiesOf } from '@storybook/web-components';
import { inFooterTemplate, inHighlightBoxTemplate } from './link-list.content';

import { linkListTemplate } from '@dso-toolkit/css/src/components/link-list/link-list.template';
import readme from '@dso-toolkit/css/src/components/link-list/readme.md';

storiesOfLinkList(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    linkListTemplate,
    inHighlightBoxTemplate,
    inFooterTemplate
  }
);
