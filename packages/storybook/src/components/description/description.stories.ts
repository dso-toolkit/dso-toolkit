import { storiesOfDescription } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';
import { html } from 'lit-html';

import { descriptionTemplate } from '@dso-toolkit/css/src/components/description/description.template';
import readme from '@dso-toolkit/css/src/components/description/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfDescription(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    descriptionTemplate,
    exampleTemplate: (exampleData) => html`${exampleData.map(d => typeof d === 'string' ? d : descriptionTemplate(d))}`
  }
);
