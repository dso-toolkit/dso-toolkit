import { ArgTypes } from "@storybook/types";

import { Skiplink } from "./skiplink.models.js";

export interface SkiplinkArgs {}

export const skiplinkArgs: SkiplinkArgs = {};

export const skiplinkArgTypes: ArgTypes<SkiplinkArgs> = {};

export function skiplinkArgsMapper(a: SkiplinkArgs): Skiplink {
  return {
    ...a,
  };
}
