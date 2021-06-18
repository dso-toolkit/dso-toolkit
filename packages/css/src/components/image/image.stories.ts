import { storiesOfImage } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { imageTemplate } from './image.template';
import readme from './readme.md';

storiesOfImage(
  {
    storiesOf,
    module,
    readme
  },
  {
    imageTemplate
  }
);
