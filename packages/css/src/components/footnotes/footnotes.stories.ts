import { storiesOfFootnotes } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { footnotesListTemplate, footnotesReferenceTemplate, footnotesExampleTemplate } from './footnotes.template';
import readme from './readme.md';

storiesOfFootnotes(
  {
    module,
    storiesOf,
    readme
  },
  {
    footnotesExampleTemplate,
    footnotesReferenceTemplate,
    footnotesListTemplate
  }
);
