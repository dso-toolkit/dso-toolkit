import readme from "@dso-toolkit/core/src/components/history-item/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { StoryObj } from "../../shared/story-obj.js";

import { HistoryItemArgs, historyItemArgTypes, historyItemArgsMapper } from "./history-item.args.js";
import { historyItemTemplate } from "./history-item.template.js";

type HistoryItemStory = StoryObj<HistoryItemArgs, Renderer>;

const meta: Meta<HistoryItemArgs> = {
  title: "Core/History Item",
  argTypes: historyItemArgTypes,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

const render = (args: HistoryItemArgs) => historyItemTemplate(historyItemArgsMapper(args));

export const InWerking: HistoryItemStory = {
  args: {
    date: "20-07-2025",
    statusMessage: "Inzage tot 20-10-2025",
    type: "in-werking",
    title: '"Voorbeschermingsregels hyperscale datacentra" opgenomen in plan',
    warning: "Waarschuwing message",
    explanation: "Uitleg message",
    dsoClick: fn(),
  },
  render,
};

export const Besluit: HistoryItemStory = {
  args: {
    date: "20-07-2025",
    statusMessage: "Inzage tot 20-10-2025",
    type: "besluit",
    title: '"Voorbeschermingsregels hyperscale datacentra" opgenomen in plan',
    dsoClick: fn(),
  },
  render,
};

export const TijdelijkRegelingdeel: HistoryItemStory = {
  args: {
    date: "20-07-2025",
    statusMessage: "Inzage tot 20-10-2025",
    type: "tijdelijk-regelingdeel",
    title: '"Voorbeschermingsregels hyperscale datacentra" opgenomen in plan',
    dsoClick: fn(),
  },
  render,
};

export const TijdelijkRegelingdeelBesluit: HistoryItemStory = {
  args: {
    date: "20-07-2025",
    statusMessage: "Inzage tot 20-10-2025",
    type: "tijdelijk-regelingdeel-besluit",
    title: '"Voorbeschermingsregels hyperscale datacentra" opgenomen in plan',
    dsoClick: fn(),
  },
  render,
};

export const Waarschuwing: HistoryItemStory = {
  args: {
    date: "20-07-2025",
    statusMessage: "Inzage tot 20-10-2025",
    type: "waarschuwing",
    dsoClick: fn(),
  },
  render,
};

export const Ontwerp: HistoryItemStory = {
  args: {
    date: "20-07-2025",
    statusMessage: "Inzage tot 20-10-2025",
    type: "ontwerp",
    title: '"Voorbeschermingsregels hyperscale datacentra" opgenomen in plan',
    dsoClick: fn(),
  },
  render,
};
