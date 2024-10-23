import { ArgTypes } from "@storybook/types";

import { Skiplinks } from "./skiplinks.models.js";

export interface SkiplinksArgs {
}

export const skiplinksArgs: SkiplinksArgs = {
};

export const skiplinksArgTypes: ArgTypes<SkiplinksArgs> = {
};

export function skiplinksArgsMapper(a: SkiplinksArgs): Skiplinks {
  return {
    ...a
  };
}
