import { ArgType } from "@storybook/addons";

export type ArgTypes<ComponentArgs> = {
  [P in keyof Required<ComponentArgs>]: ArgType;
};
