/* eslint-disable @typescript-eslint/no-explicit-any -- Er zit een bug in de routine waarmee het nu niet mogelijk is om statisch te typeren, vandaar any */
import { Addon_ClientStoryApi, Addon_StoryApi } from "@storybook/types";

import { StoryRoot } from "./story-root.enum.js";

export interface StorybookParameters {
  module: NodeModule;
  storiesOf: Addon_ClientStoryApi<any>["storiesOf"];
  readme: string;
  root?: StoryRoot;
  storyApiOptions?: {
    parameters?: Array<Parameters<Addon_StoryApi<any>["addParameters"]>[0]>;
    decorators?: Array<Parameters<Addon_StoryApi<any>["addDecorator"]>[0]>;
  };
}
