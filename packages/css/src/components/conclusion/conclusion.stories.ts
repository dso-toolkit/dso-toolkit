import { storiesOfConclusion } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';
import { html } from 'lit-html';

import { conclusionTemplate } from './conclusion.template';
import readme from './readme.md';

const info = html`
  <div class="dso-rich-content">
    <p>De regels zijn erg ingewikkeld. Vraag uw gemeente Den Haag (070-1214070) of u een omgevingsvergunning moet aanvragen of een melding moet doen.</p>
  </div>
`;

storiesOfConclusion(
  {
    module,
    storiesOf,
    readme
  },
  {
    conclusionTemplate,
    info
  }
);
