import { ArgTypes, noControl } from "../../storybook/index.js";

import { ExpandableHeading, ExpandableHeadingTemplates } from "./expandable-heading.models.js";

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
  { title, addonsEnd, addonsStart, content }: ExpandableHeadingTemplates<TemplateFnReturnType>
): ExpandableHeading<TemplateFnReturnType> {
  return {
    ...a,
    title,
    addonsStart,
    addonsEnd,
    content,
  };
}
