import { storiesOfContext } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import cssReadme from '@dso-toolkit/css/src/components/context/readme.md';

import { children, content, label } from './context.content';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';
import { templateContainer } from '../../templates';

storiesOfContext(
  {
    storiesOf,
    module,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  templateContainer,
  ({ contextTemplate }) => ({ contextTemplate, label, content, children })
);
