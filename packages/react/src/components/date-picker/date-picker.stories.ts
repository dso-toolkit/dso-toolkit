import { storiesOfDatePicker } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/react';

import {
  datePickerTemplate,
  datePickerWithLabelTemplate,
  datePickerShowByScriptingTemplate
} from './date-picker.template';
import readme from './readme.md';

storiesOfDatePicker(
  {
    module,
    storiesOf,
    readme
  },
  {
    datePickerTemplate,
    datePickerWithLabelTemplate,
    datePickerShowByScriptingTemplate
  }
);
