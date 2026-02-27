import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction, noControl } from "../../storybook";
import { IconAlias } from "../icon";
import { LabelStatus } from "../label";
import { RenvooiValue } from "../renvooi";

import {
  Accordion,
  AccordionHeading,
  AccordionSection,
  AccordionSectionStatus,
  AccordionSectionWijzigactie,
} from "./accordion.models.js";

export interface AccordionArgs {
  variant: undefined | "default" | "compact" | "conclusion" | "neutral" | "compact-black";
  reverseAlign: boolean;
  dsoToggleClick: HandlerFunction;
  dsoAnimationStart: HandlerFunction;
  dsoAnimationEnd: HandlerFunction;
  open: boolean;
  statusDescription: string;
  status: AccordionSectionStatus;
  attachmentCount: number;
  icon: IconAlias;
  heading: AccordionHeading;
  handleUrl: string;
  handleTitle: RenvooiValue;
  wijzigactie: AccordionSectionWijzigactie | undefined;
  demoScrollIntoView: "start" | "end" | undefined;
  label: string;
  labelStatus: LabelStatus;
  active: boolean;
  activatable: boolean;
  dsoActiveChange: HandlerFunction;
}

export const accordionArgs: Pick<
  AccordionArgs,
  | "demoScrollIntoView"
  | "open"
  | "handleTitle"
  | "dsoToggleClick"
  | "dsoAnimationStart"
  | "dsoAnimationEnd"
  | "dsoActiveChange"
> = {
  open: false,
  demoScrollIntoView: undefined,
  handleTitle: "ongewijzigd",
  dsoToggleClick: fn(),
  dsoAnimationStart: fn(),
  dsoAnimationEnd: fn(),
  dsoActiveChange: fn(),
};

export const accordionArgTypes: ArgTypes<AccordionArgs> = {
  variant: {
    options: [undefined, "default", "compact", "conclusion", "neutral", "compact-black"],
    control: {
      type: "select",
    },
  },
  reverseAlign: {
    control: {
      type: "boolean",
    },
  },
  /* Section args */
  dsoToggleClick: argTypeAction(),
  dsoAnimationStart: argTypeAction(),
  dsoAnimationEnd: argTypeAction(),
  open: {
    control: {
      type: "boolean",
    },
  },
  statusDescription: {
    control: {
      type: "text",
    },
  },
  status: {
    options: [undefined, "success", "info", "warning", "danger", "error"],
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
    options: [undefined, "", "plus", "table-outline"],
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
    ...noControl,
  },
  wijzigactie: {
    ...noControl,
  },
  active: {
    control: {
      type: "boolean",
    },
  },
  activatable: {
    ...noControl,
  },
  dsoActiveChange: argTypeAction(),
  /** demo args */
  demoScrollIntoView: {
    options: [undefined, "start", "end"],
    control: {
      type: "select",
    },
  },
  labelStatus: {
    options: [undefined, "primary", "success", "info", "warning", "danger", "error", "bright", "attention"],
    control: {
      type: "select",
    },
  },
  label: {
    control: {
      type: "text",
    },
  },
};

export function accordionArgsMapper<TemplateFnReturnType>(
  a: AccordionArgs,
  sections: AccordionSection<TemplateFnReturnType>[],
): Accordion<TemplateFnReturnType> {
  return {
    variant: a.variant,
    reverseAlign: a.reverseAlign,
    sections: sections.map((s, i) => {
      const section: AccordionSection<TemplateFnReturnType> = {
        ...s,
        dsoToggleClick: (e) => a.dsoToggleClick(e.detail),
        dsoActiveChange: (e) => a.dsoActiveChange(e.detail),
      };

      if (i === 1) {
        section.open = a.open;
        section.statusDescription = a.statusDescription;
        section.status = a.status;
        section.attachmentCount = a.attachmentCount;
        section.icon = a.icon;
        section.heading = a.heading;
        section.handleUrl = a.handleUrl;
        section.labelStatus = a.labelStatus;
        section.label = a.label;
        section.activatable = a.activatable;
        section.active = a.active;
        section.dsoAnimationStart = (e) => {
          if (a.demoScrollIntoView === "start" && a.open) {
            e.detail.scrollIntoView();
          }

          a.dsoAnimationStart(e.detail);
        };

        section.dsoAnimationEnd = (e) => {
          if (a.demoScrollIntoView === "end" && a.open) {
            e.detail.scrollIntoView();
          }

          a.dsoAnimationEnd(e.detail);
        };
      }

      if (a.demoScrollIntoView === "end") {
        if (i === 0) {
          section.open = true;
        }

        if (i === sections.length - 1) {
          section.open = true;
        }
      }

      return section;
    }),
  };
}
