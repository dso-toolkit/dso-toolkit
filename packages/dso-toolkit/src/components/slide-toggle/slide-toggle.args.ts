import { ArgTypes, noControl } from "../../storybook/index.js";
import { SlideToggle } from "./slide-toggle.models.js";

export interface SlideToggleArgs {
  checked: boolean;
}

export const slideToggleArgTypes: ArgTypes<SlideToggleArgs> = {
  checked: {
    ...noControl,
  },
};

export function slideToggleArgsMapper(a: SlideToggleArgs): SlideToggle {
  return {
    ...a,
  };
}
