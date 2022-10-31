import { ClientStoryApi } from "@storybook/addons";

import { StoryRoot } from "./story-root.enum";

export interface StorybookParameters {
  module: NodeModule;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Kan weg als #1808 is gemerged
  storiesOf: ClientStoryApi<any>["storiesOf"];
  readme: string;
  root?: StoryRoot;
}
