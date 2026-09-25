import readme from "@dso-toolkit/core/src/components/plekinfo-card/readme.md?raw";
import { Meta, StoryObj } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";

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

type PlekinfoCardStory = StoryObj<PlekinfoCardArgs>;

const meta: Meta<PlekinfoCardArgs> = {
  title: "Core/Plekinfo Card",
  argTypes: plekinfoCardArgTypes,
  args: plekinfoCardArgs,
  render: (args) => plekinfoCardTemplate(plekinfoCardArgsMapper(args, defaultSymbol(), content())),
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

const decorators = [(story: Parameters<typeof decorator>[0]) => decorator(story, plekinfoCardDemoCss)];

export const Default: PlekinfoCardStory = {
  decorators,
};

export const Static: PlekinfoCardStory = {
  args: {
    ...plekinfoCardArgs,
    href: "",
  },
  decorators,
};

export const WithoutSymbol: PlekinfoCardStory = {
  decorators,
  render: (args) => plekinfoCardTemplate(plekinfoCardArgsMapper(args, undefined, content())),
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
};
