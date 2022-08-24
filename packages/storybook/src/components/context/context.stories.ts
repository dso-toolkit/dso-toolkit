import { storiesOfContext } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { contextTemplate } from '@dso-toolkit/css/src/components/context/context.template';

import readme from '@dso-toolkit/css/src/components/context/readme.md';
import { children, content, label } from './context.content';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfContext(
  {
    storiesOf,
    module,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    contextTemplate,
    label,
    content,
    children
  }
);
