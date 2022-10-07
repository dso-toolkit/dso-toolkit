import { ClientStoryApi } from '@storybook/addons';

import { StoryRoot } from './story-root.enum';

export interface StorybookParameters {
  module: NodeModule;
  storiesOf: ClientStoryApi<any>['storiesOf'];
  readme: string;  
  root?: StoryRoot;
}
