import readme from "@dso-toolkit/core/src/components/plekinfo-card/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import {
  PlekinfoCardArgs,
  plekinfoCardArgTypes,
  plekinfoCardArgs,
  plekinfoCardArgsMapper,
} from "./plekinfo-card.args.js";
import { content, defaultSymbol } from "./plekinfo-card.content.js";
import { decorator } from "./plekinfo-card.decorator";
import { plekinfoCardDemoCss } from "./plekinfo-card.demo";
import { plekinfoCardTemplate } from "./plekinfo-card.template.js";

type PlekinfoCardStory = StoryObj<PlekinfoCardArgs, Renderer>;

const meta: Meta<PlekinfoCardArgs> = {
  title: "Core/Plekinfo Card",
  argTypes: plekinfoCardArgTypes,
  args: plekinfoCardArgs,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

const render = (args: PlekinfoCardArgs) => plekinfoCardTemplate(plekinfoCardArgsMapper(args, defaultSymbol, content));
const renderWithoutSymbol = (args: PlekinfoCardArgs) =>
  plekinfoCardTemplate(plekinfoCardArgsMapper(args, undefined, content));
const decorators = [(story: Parameters<typeof decorator>[0]) => decorator(story, plekinfoCardDemoCss)];

export const Default: PlekinfoCardStory = {
  decorators,
  render,
};

export const Static: PlekinfoCardStory = {
  args: {
    ...plekinfoCardArgs,
    href: "",
  },
  decorators,
  render,
};

export const WithoutSymbol: PlekinfoCardStory = {
  decorators,
  render: renderWithoutSymbol,
};

export const WithSlideToggle: PlekinfoCardStory = {
  args: {
    ...plekinfoCardArgs,
    interaction: {
      checked: false,
      accessibleLabel: "sr-only label van het schuifje",
    },
  },
  decorators,
  render,
};

export const WithLabel: PlekinfoCardStory = {
  args: {
    ...plekinfoCardArgs,
    meta: {
      status: "warning",
      compact: true,
      label: "Gewijzigde locatie",
    },
  },
  decorators,
  render,
};

export const WithNameChange: PlekinfoCardStory = {
  args: {
    ...plekinfoCardArgs,
    label: {
      value: {
        was: "Radargebieden",
        wordt: "Radarverstorende bouwwerken",
      },
    },
  },
  decorators,
  render,
};

export const WithNameChangeComplex: PlekinfoCardStory = {
  args: {
    ...plekinfoCardArgs,
    label: {
      value: [
        "Waardes worden weergegeven op de kaart",
        {
          was: "50 dB",
          wordt: "45 dB",
        },
        "55 dB",
      ],
    },
  },
  decorators,
  render,
};
