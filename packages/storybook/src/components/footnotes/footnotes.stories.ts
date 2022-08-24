import { storiesOfFootnotes } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { footnotesListTemplate, footnotesReferenceTemplate } from '@dso-toolkit/css/src/components/footnotes/footnotes.template';
import readme from '@dso-toolkit/css/src/components/footnotes/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';
import { footnotesExampleTemplate } from './footnotes.content';

storiesOfFootnotes(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    footnotesExampleTemplate,
    footnotesReferenceTemplate,
    footnotesListTemplate
  }
);
