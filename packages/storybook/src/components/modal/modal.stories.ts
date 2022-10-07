import { storiesOfModal } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import cssReadme from '@dso-toolkit/css/src/components/modal/readme.md';

import { StoryRoot } from '@dso-toolkit/sources/src/storybook';
import { templateContainer } from '../../templates';

storiesOfModal(
  {
    storiesOf,
    module,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  templateContainer,
  ({ modalTemplate, progressIndicatorTemplate }) => ({ modalTemplate, progressIndicatorTemplate })
);
