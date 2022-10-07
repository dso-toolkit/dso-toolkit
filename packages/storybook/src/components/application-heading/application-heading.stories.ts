import { storiesOfApplicationHeading } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import cssReadme from '@dso-toolkit/css/src/components/application-heading/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';
import { templateContainer } from '../../templates';

storiesOfApplicationHeading(
  {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  templateContainer,
  ({ applicationHeadingTemplate }) => ({ applicationHeadingTemplate })
);
