import { storiesOfContext } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { contextTemplate } from './context.template';

import { html } from 'lit-html';
import readme from './readme.md';

const content = html`
  <div class="dso-context-filter">
    <label for="sorting-select">Sorteer op:</label>
    <select id="sorting-select">
      <option value="most-chosen">Meest gekozen</option>
      <option value="alphabetic" selected>Alfabetisch</option>
    </select>
  </div>
`;

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
