import { storiesOfDatePicker } from '@dso-toolkit/sources';
import { DecoratorFunction } from '@storybook/addons';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';

import {
  datePickerTemplate,
  datePickerWithLabelTemplate,
  datePickerShowByScriptingTemplate
} from './date-picker.template';
import readme from './readme.md';

const decorator: DecoratorFunction<TemplateResult> = story => html`
  <div style="width: 175px;">
    ${story()}
  </div>
`;

storiesOfDatePicker(
  {
    module,
    storiesOf,
    readme
  },
  {
    datePickerTemplate,
    datePickerWithLabelTemplate,
    datePickerShowByScriptingTemplate,
    decorator
  }
);
