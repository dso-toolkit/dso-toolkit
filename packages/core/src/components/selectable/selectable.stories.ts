import { storiesOfSelectable } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';
import { html } from 'lit-html';

import readme from './readme.md';
import { selectableTemplate } from './selectable.template';

const infoRichContent = html`
  <div class="dso-rich-content" slot="info">
    <p>Rijke inhoud</p>
    <p>Ziet er zo uit</p>
    <ul>
      <li>Lijstjes</li>
    </ul>
    <p>Kan allemaal</p>
  </div>
`;

storiesOfSelectable(
  {
    module,
    storiesOf,
    readme
  },
  {
    selectableTemplate,
    infoRichContent
  }
);
