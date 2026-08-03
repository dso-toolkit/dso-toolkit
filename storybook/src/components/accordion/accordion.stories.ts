import componentsReadme from "@dso-toolkit/core/src/components/accordion/components/readme.md?raw";
import readme from "@dso-toolkit/core/src/components/accordion/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";
import { children } from "../badge/badge.content.js";

import { AccordionArgs, accordionArgTypes, accordionArgs, accordionArgsMapper } from "./accordion.args.js";
import {
  activatableSections,
  addonsSections,
  alignmentSections,
  anchorSections,
  animatedFormGroupSections,
  basicSections,
  compactSections,
  nestedSections,
  renvooiSections,
} from "./accordion.content.js";
import { accordionTemplate } from "./accordion.template.js";

type AccordionStory = StoryObj<AccordionArgs, Renderer>;

const meta: Meta<AccordionArgs> = {
  title: "Core/Accordion",
  argTypes: accordionArgTypes,
  args: accordionArgs,
  parameters: {
    docs: {
      page: () => compiler(`${readme}\n${componentsReadme}`),
    },
  },
};

export default meta;

const badgeChildren = children();

export const Default: AccordionStory = {
  args: {
    label: "Attentie",
    labelStatus: "attention",
  },
  render: (args) => accordionTemplate(accordionArgsMapper(args, basicSections, badgeChildren)),
};

export const Activatable: AccordionStory = {
  args: {
    variant: "compact-black",
    activatable: true,
    active: true,
  },
  render: (args) => accordionTemplate(accordionArgsMapper(args, activatableSections, badgeChildren)),
};

export const Compact: AccordionStory = {
  args: {
    variant: "compact",
  },
  render: (args) => accordionTemplate(accordionArgsMapper(args, compactSections, badgeChildren)),
};

export const CompactBlack: AccordionStory = {
  args: {
    variant: "compact-black",
  },
  render: (args) => accordionTemplate(accordionArgsMapper(args, basicSections, badgeChildren)),
};

export const Neutral: AccordionStory = {
  args: {
    variant: "neutral",
  },
  render: (args) => accordionTemplate(accordionArgsMapper(args, basicSections, badgeChildren)),
};

export const Conclusion: AccordionStory = {
  args: {
    variant: "conclusion",
  },
  render: (args) => accordionTemplate(accordionArgsMapper(args, basicSections, badgeChildren)),
};

export const HandleAnchors: AccordionStory = {
  render: (args) => accordionTemplate(accordionArgsMapper(args, anchorSections, badgeChildren)),
};

export const Nested: AccordionStory = {
  args: {
    open: true,
  },
  render: (args) => accordionTemplate(accordionArgsMapper(args, nestedSections, badgeChildren)),
};

export const AddonsSections: AccordionStory = {
  render: (args) => accordionTemplate(accordionArgsMapper(args, addonsSections, badgeChildren)),
};

export const AlignmentSections: AccordionStory = {
  render: (args) => accordionTemplate(accordionArgsMapper(args, alignmentSections, badgeChildren)),
};

export const RenvooiSections: AccordionStory = {
  args: {
    variant: "compact-black",
  },
  render: (args) => accordionTemplate(accordionArgsMapper(args, renvooiSections, badgeChildren)),
};

export const AnimatedFormGroupSections: AccordionStory = {
  args: {
    open: true,
  },
  render: (args) => accordionTemplate(accordionArgsMapper(args, animatedFormGroupSections(), badgeChildren)),
};
