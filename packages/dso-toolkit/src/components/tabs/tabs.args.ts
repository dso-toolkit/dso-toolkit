import { ArgTypes } from "@storybook/types";

import { noControl } from "../../storybook/index.js";

import { Tabs, TabsItem } from "./tabs.models.js";
import { HandlerFunction } from "@storybook/addon-actions/*";

export interface TabsArgs<TemplateFnRetunType> {
  items: TabsItem<TemplateFnRetunType>[];
  dsoTabSwitch: HandlerFunction;
}

export const tabsArgTypes: ArgTypes<TabsArgs<unknown>> = {
  items: {
    ...noControl,
  },
  dsoTabSwitch: {
    ...noControl,
    action: "dsoTabSwitch",
  },
};

export function tabsArgsMapper<TemplateFnRetunType>(a: TabsArgs<TemplateFnRetunType>): Tabs<TemplateFnRetunType> {
  return {
    ...a,
  };
}
