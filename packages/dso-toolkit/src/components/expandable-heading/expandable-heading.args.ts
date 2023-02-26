import { ArgTypes } from "../../storybook/index.js";

import { ExpandableHeading, ExpandableHeadingTemplates } from "./expandable-heading.models.js";

export interface ExpandableHeadingArgs {
  heading: "h2" | "h3" | "h4" | "h5" | "h6";
  color: "default" | "black";
}

export const expandableHeadingArgTypes: ArgTypes<ExpandableHeadingArgs> = {
  heading: {
    options: [undefined, "h2", "h3", "h4", "h5", "h6"],
    control: {
      type: "select",
    },
  },
  color: {
    options: [undefined, "default", "black"],
    control: {
      type: "select",
    },
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
