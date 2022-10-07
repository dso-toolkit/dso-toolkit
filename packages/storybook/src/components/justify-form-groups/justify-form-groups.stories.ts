import { storiesOfJustifyFormGroups } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import cssReadme from '@dso-toolkit/css/src/components/justify-form-groups/readme.md';

import { StoryRoot } from '@dso-toolkit/sources/src/storybook';
import { templateContainer } from '../../templates';

storiesOfJustifyFormGroups(
  {
    storiesOf,
    module,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  templateContainer,
  ({ justifyFormGroupsTemplate }) => ({ justifyFormGroupsTemplate })
);
