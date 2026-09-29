import readme from "@dso-toolkit/core/src/components/plekinfo-card/readme.md?raw";
import { Meta, StoryObj } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";

import { withItemsContent } from "./plekinfo-card-item.content.js";
import {
  PlekinfoCardArgs,
  plekinfoCardArgTypes,
  plekinfoCardArgs,
  plekinfoCardArgsMapper,
} from "./plekinfo-card.args.js";
import { content, defaultSymbol } from "./plekinfo-card.content.js";
import { decorator } from "./plekinfo-card.decorator.js";
import { plekinfoCardTemplate } from "./plekinfo-card.template.js";

type PlekinfoCardStory = StoryObj<PlekinfoCardArgs>;

const meta: Meta<PlekinfoCardArgs> = {
  title: "Core/Plekinfo Card",
  argTypes: plekinfoCardArgTypes,
  args: plekinfoCardArgs,
  render: (args) => plekinfoCardTemplate(plekinfoCardArgsMapper(args, defaultSymbol(), content())),
  decorators: [decorator],
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Default: PlekinfoCardStory = {
  args: {
    noStroke: true,
  },
};

export const Static: PlekinfoCardStory = {
  args: {
    ...plekinfoCardArgs,
    noStroke: true,
    href: "",
  },
};

export const WithoutSymbol: PlekinfoCardStory = {
  args: {
    noStroke: true,
  },
  render: (args) => plekinfoCardTemplate(plekinfoCardArgsMapper(args, undefined, content())),
};

export const WithSlideToggle: PlekinfoCardStory = {
  args: {
    ...plekinfoCardArgs,
    noStroke: true,
    interaction: {
      checked: false,
      accessibleLabel: "sr-only label van het schuifje",
    },
  },
};

export const WithLabel: PlekinfoCardStory = {
  args: {
    ...plekinfoCardArgs,
    noStroke: true,
    meta: {
      status: "warning",
      compact: true,
      label: "Gewijzigde locatie",
    },
  },
};

export const WithNameChange: PlekinfoCardStory = {
  args: {
    ...plekinfoCardArgs,
    noStroke: true,
    label: {
      value: {
        was: "Radargebieden",
        wordt: "Radarverstorende bouwwerken",
      },
    },
  },
};

export const WithNameChangeComplex: PlekinfoCardStory = {
  args: {
    ...plekinfoCardArgs,
    noStroke: true,
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
};

export const WithItems: PlekinfoCardStory = {
  args: {
    ...plekinfoCardArgs,
    label: {
      value: "Item label",
    },
    interaction: {
      checked: false,
      accessibleLabel: "sr-only label van het schuifje",
    },
  },
  render: (args) =>
    plekinfoCardTemplate({
      ...plekinfoCardArgsMapper(args, defaultSymbol()),
      items: withItemsContent,
    }),
};
