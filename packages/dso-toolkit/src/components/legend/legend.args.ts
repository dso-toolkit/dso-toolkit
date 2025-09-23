import { ArgTypes } from "storybook/internal/types";

import { Legend } from "./legend.models.js";

export interface LegendArgs {}

export const legendArgs: LegendArgs = {};

export const legendArgTypes: ArgTypes<LegendArgs> = {};

export function legendArgsMapper(a: LegendArgs): Legend {
  return {
    ...a,
  };
}
