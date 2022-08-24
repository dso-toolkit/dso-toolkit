import { storiesOfDatePicker } from '@dso-toolkit/sources';
import { DecoratorFunction } from '@storybook/addons';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';

import { datePickerTemplate } from '@dso-toolkit/core/src/components/date-picker/date-picker.template';
import readme from '@dso-toolkit/core/src/components/date-picker/readme.md';

import { datePickerShowByScriptingTemplate, datePickerWithLabelTemplate } from './date-picker.content';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

const decorator: DecoratorFunction<TemplateResult> = story => html`
  <div style="width: 175px;">
    ${story()}
  </div>
`;

storiesOfDatePicker(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.Core
  },
  {
    datePickerTemplate,
    datePickerWithLabelTemplate,
    datePickerShowByScriptingTemplate,
    decorator
  }
);
