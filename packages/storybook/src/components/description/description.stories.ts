import { storiesOfDescription } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';
import { html } from 'lit-html';

import cssReadme from '@dso-toolkit/css/src/components/description/readme.md';

import { StoryRoot } from '@dso-toolkit/sources/src/storybook';
import { templateContainer } from '../../templates';

storiesOfDescription(
  {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  templateContainer,
  ({ descriptionTemplate }) => ({ descriptionTemplate, exampleTemplate: (exampleData) => html`${exampleData.map(d => typeof d === 'string' ? d : descriptionTemplate(d))}` })
);
