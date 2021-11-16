import { storiesOfContext } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { contextTemplate } from './context.template';

import { html } from 'lit-html';
import readme from './readme.md';

const content = html`
  <div class="form-group dso-select">
    <div class="dso-label-container">
      <label for="context-select" class="control-label">Sorteer op:</label>
    </div>
    <div class="dso-field-container">
      <select id="context-select" class="form-control">
        <option value="most-chosen">Meest gekozen</option>
        <option value="alphabetical">Alfabetisch</option>
      </select>
    </div>
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
