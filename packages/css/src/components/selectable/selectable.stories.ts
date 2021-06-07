import { storiesOfSelectable } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';
import { html } from 'lit-html';

import { selectableTemplate } from './selectable.template';
import readme from './readme.md';

const info = html`
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
    info
  }
);
