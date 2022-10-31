import { storiesOfBanner } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/react';

import { templateContainer } from '../../templates';
import { dangerRichContent, dangerWithHeadingsRichContent, richWarningRichContent, warningRichContent } from './banner.content';

import readme from './readme.md';

storiesOfBanner({
  parameters: {
    module,
    storiesOf,
    readme
  },
  templateContainer,
  storyTemplates: ({ bannerTemplate }) => ({ bannerTemplate, dangerRichContent, dangerWithHeadingsRichContent, richWarningRichContent, warningRichContent })
});
