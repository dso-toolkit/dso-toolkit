import { ArgTypes } from "../../storybook";
import { HelpcenterPanel } from "./helpcenter-panel.models";

export interface HelpcenterPanelArgs {
  content: string;
  label?: string;
  url: string;
}

export const helpcenterPanelArgTypes: ArgTypes<HelpcenterPanelArgs> = {
  content: {
    table: {
      disable: true,
    },
  },
  label: {
    control: {
      type: "text",
    },
  },
  url: {
    control: {
      type: "text",
    },
  },
};

export function helpcenterPanelArgsMapper(a: HelpcenterPanelArgs): HelpcenterPanel {
  return {
    content: a.content,
    label: a.label,
    url: a.url,
  };
}
