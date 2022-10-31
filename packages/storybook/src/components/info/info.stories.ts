import { storiesOfInfo } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import cssReadme from '@dso-toolkit/css/src/components/info/readme.md';
import coreReadme from '@dso-toolkit/core/src/components/info/readme.md';

import { richContent } from './info.content';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';
import { templateContainer } from '../../templates';

storiesOfInfo({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  templateContainer,
  storyTemplates: ({ infoTemplate }, templates) => ({ infoTemplate, richContent: richContent(templates) })
});

storiesOfInfo({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core
  },
  templateContainer,
  storyTemplates: ({ infoTemplate }, templates) => ({ infoTemplate, richContent: richContent(templates) })
});
