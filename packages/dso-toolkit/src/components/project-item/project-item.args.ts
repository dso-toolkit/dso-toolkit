import { ArgTypes } from "@storybook/types";

import { ProjectItem } from "./project-item.models.js";
import { HandlerFunction } from "@storybook/addon-actions";
import { HeadingLevel } from "../heading/heading.models.js";

export interface ProjectItemArgs {
  title: string;
  href: string;
  label: string;
  headingLevel: HeadingLevel;
  dsoEdit: HandlerFunction;
  dsoRemove: HandlerFunction;
}

export const projectItemArgs: Omit<ProjectItemArgs, "dsoEdit" | "dsoRemove"> = {
  title: "Bomen kappen",
  href: "#",
  label: "Wordt verwijderd op 12-09-2024",
  headingLevel: 2,
};

export const projectItemArgTypes: ArgTypes<ProjectItemArgs> = {
  title: {
    type: "string",
  },
  href: {
    type: "string",
  },
  label: {
    type: "string",
  },
  headingLevel: {
    options: [1, 2, 3, 4, 5, 6],
    control: {
      type: "select",
    },
  },
  dsoEdit: {
    action: "dsoEdit",
  },
  dsoRemove: {
    action: "dsoRemove",
  },
};

export function projectItemArgsMapper(a: ProjectItemArgs): ProjectItem<string> {
  return {
    href: a.href,
    title: a.title,
    label: a.label,
    headingLevel: a.headingLevel,
    progress: {
      definitions: [
        {
          term: "Ingediende verzoeken",
          descriptions: [{ content: "4" }],
        },
        {
          term: "In te dienen activiteiten",
          descriptions: [{ content: "16" }],
        },
      ],
    },
    status: {
      definitions: [
        {
          term: "Locatie",
          descriptions: [{ content: "Getekend gebied" }],
        },
        {
          term: "Mijn rol",
          descriptions: [{ content: "Gemachtigde" }],
        },
        {
          term: "Laatste wijziging",
          descriptions: [{ content: "12-09-2023" }],
        },
      ],
    },
    actions: [
      {
        label: "Bewerk",
        type: "button",
        variant: "tertiary",
        icon: {
          icon: "pencil",
        },
        iconMode: "only",
        onClick: a.dsoEdit,
      },
      {
        label: "Verwijder",
        type: "button",
        variant: "tertiary",
        icon: {
          icon: "trash",
        },
        iconMode: "only",
        onClick: a.dsoRemove,
      },
    ],
  };
}
