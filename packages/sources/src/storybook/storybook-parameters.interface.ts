/* eslint-disable @typescript-eslint/no-explicit-any -- Er zit een bug in de routine waarmee het nu niet mogelijk is om statisch te typeren, vandaar any */
import { ClientStoryApi } from "@storybook/addons";

import { StoryRoot } from "./story-root.enum";

export interface StorybookParameters {
  module: NodeModule;
  storiesOf: ClientStoryApi<any>["storiesOf"];
  readme: string;
  root?: StoryRoot;
  storyApiOptions?: {
    parameters?: Array<Parameters<ClientStoryApi<any>["addParameters"]>[0]>;
    decorators?: Array<Parameters<ClientStoryApi<any>["addDecorator"]>[0]>;
  };
}
