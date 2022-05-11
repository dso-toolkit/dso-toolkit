import { storiesOfForm } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';
import { html } from 'lit-html';

import { formGroupInputTemplate } from './form-groups/input/form-group-input.template';

import { formTemplate } from './form.template';
import readme from './readme.md';

storiesOfForm(
  {
    module,
    storiesOf,
    readme
  },
  {
    formTemplate,
    formGroupDecorator: story => html`<form><fieldset><legend>Example</legend>${story()}</fieldset></form>`,
    formGroupInputTemplate
  }
);
