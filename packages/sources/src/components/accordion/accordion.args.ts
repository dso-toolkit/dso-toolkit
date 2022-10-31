import { HandlerFunction } from "@storybook/addon-actions";

import { ArgTypes, noControl } from "../../storybook";
import { Accordion, AccordionHeading, AccordionSection, AccordionSectionState } from "./accordion.models";

export interface AccordionArgs {
  variant: undefined | "compact" | "conclusion";
  reverseAlign: boolean;
  allowMultipleOpen: boolean;
  dsoToggleSection: HandlerFunction;
  open: boolean;
  status: string;
  state: AccordionSectionState;
  attachmentCount: number;
  icon: string;
  heading: AccordionHeading;
  handleUrl: string;
  handleTitle: string;
  sections: AccordionSection[];
}

export const accordionArgTypes: ArgTypes<AccordionArgs> = {
  variant: {
    options: [undefined, "compact", "conclusion"],
    control: {
      type: "select",
      labels: {
        undefined: "default",
      },
    },
  },
  allowMultipleOpen: {
    control: {
      type: "boolean",
    },
  },
  reverseAlign: {
    control: {
      type: "boolean",
    },
  },
  dsoToggleSection: {
    ...noControl,
    action: "dsoToggleSection",
  },
  /* Section args */
  open: {
    control: {
      type: "boolean",
    },
  },
  status: {
    control: {
      type: "text",
    },
  },
  state: {
    options: [undefined, "success", "info", "warning", "danger"],
    control: {
      type: "select",
    },
  },
  attachmentCount: {
    control: {
      type: "number",
    },
  },
  icon: {
    options: [undefined, "", "plus", "table"],
    control: {
      type: "select",
    },
  },
  heading: {
    options: ["h2", "h3", "h4", "h5"],
    control: {
      type: "select",
    },
  },
  handleUrl: {
    control: {
      text: "select",
    },
  },
  handleTitle: {
    control: {
      type: "text",
    },
  },
  sections: {
    ...noControl,
  },
};

export function accordionArgsMapper(a: AccordionArgs): Accordion {
  const firstSection = a.sections[0];

  if (firstSection) {
    firstSection.open = a.open;
    firstSection.status = a.status;
    firstSection.state = a.state;
    firstSection.attachmentCount = a.attachmentCount;
    firstSection.icon = a.icon;
    firstSection.heading = a.heading;
    firstSection.handleUrl = a.handleUrl;
  }

  return {
    variant: a.variant,
    reverseAlign: a.reverseAlign,
    allowMultipleOpen: a.allowMultipleOpen,
    dsoToggleSection: a.dsoToggleSection,
    sections: a.sections,
  };
}
