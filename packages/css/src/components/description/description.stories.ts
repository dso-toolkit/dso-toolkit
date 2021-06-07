import { storiesOfDescription } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';
import { html } from 'lit-html';

import { descriptionTemplate } from './description.template';
import readme from './readme.md';

storiesOfDescription(
  {
    module,
    storiesOf,
    readme
  },
  {
    descriptionTemplate,
    exampleTemplate: ({ textBefore, description, textAfter }) => html`${textBefore} ${description} ${textAfter}`
  }
);
