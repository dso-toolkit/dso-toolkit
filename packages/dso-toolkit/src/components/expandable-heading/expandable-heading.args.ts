import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes, noControl } from "../../storybook/index.js";
import { EditAction, ExpandableHeading, ExpandableHeadingTemplates } from "./expandable-heading.models.js";

export interface ExpandableHeadingArgs {
  heading: "h2" | "h3" | "h4" | "h5" | "h6";
  color: "default" | "black";
  editAction: EditAction;
  dsoToggle: HandlerFunction;
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
  editAction: {
    options: [undefined, "delete", "insert"],
    control: {
      type: "select",
    },
  },
  dsoToggle: {
    ...noControl,
    action: "dsoToggle",
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
    dsoToggle: (e) => a.dsoToggle(e.detail),
  };
}
