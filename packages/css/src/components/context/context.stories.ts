import { storiesOfContext } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { buttonTemplate } from '../button/button.template';
import { contextTemplate } from './context.template';

import { html } from 'lit-html';
import readme from './readme.md';

const content = buttonTemplate({ url: '#', modifier: 'dso-tertiary', label: 'Versies', icon: { icon: 'chevron-down' } });

const children = html`
  <div class="row">
    <div class="col-xs-12">
      [..]
    </div>
  </div>
`;

const label = html`
  <h4>5 activiteiten</h4>
`;

storiesOfContext(
  {
    storiesOf,
    module,
    readme
  },
  {
    contextTemplate,
    label,
    content,
    children
  }
);
