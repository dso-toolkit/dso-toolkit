import { ArgTypes, noControl } from "../../storybook/index.js";

import { ExpandableHeading } from "./expandable-heading.models.js";

export interface ExpandableHeadingArgs {
  heading: "h2" | "h3" | "h4" | "h5" | "h6";
}

export const expandableHeadingArgTypes: ArgTypes<ExpandableHeadingArgs> = {
  heading: {
    ...noControl,
  },
};

export function expandableHeadingArgsMapper<TemplateFnReturnType>(
  a: ExpandableHeadingArgs,
  content: ExpandableHeading<TemplateFnReturnType>
): ExpandableHeading<TemplateFnReturnType> {
  return {
    ...a,
    content,
  };
}
