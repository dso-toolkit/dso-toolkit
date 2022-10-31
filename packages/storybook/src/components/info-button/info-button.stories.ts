import { storiesOfInfoButton } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import cssReadme from '@dso-toolkit/css/src/components/info-button/readme.md';
import coreReadme from '@dso-toolkit/core/src/components/info-button/readme.md';

import { StoryRoot } from '@dso-toolkit/sources/src/storybook';
import { templateContainer } from '../../templates';

storiesOfInfoButton({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  templateContainer,
  storyTemplates: ({ infoButtonTemplate }) => ({ infoButtonTemplate })
});

storiesOfInfoButton({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core
  },
  templateContainer,
  storyTemplates: ({ infoButtonTemplate }) => ({ infoButtonTemplate })
});
