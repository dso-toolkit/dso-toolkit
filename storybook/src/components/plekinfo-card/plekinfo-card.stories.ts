import { Meta, StoryObj } from "@storybook/web-components-vite";

import { omgevingsnormContent, withItemsContent } from "./plekinfo-card-item.content.js";
import {
  PlekinfoCardArgs,
  plekinfoCardArgTypes,
  plekinfoCardArgs,
  plekinfoCardArgsMapper,
  plekinfoCardBaseArgsMapper,
} from "./plekinfo-card.args.js";
import { content, defaultSymbol } from "./plekinfo-card.content.js";
import { decorator } from "./plekinfo-card.decorator.js";
import { plekinfoCardTemplate } from "./plekinfo-card.template.js";

type PlekinfoCardStory = StoryObj<PlekinfoCardArgs>;

const meta: Meta<PlekinfoCardArgs> = {
  title: "Core/Plekinfo Card",
  tags: ["!autodocs"],
  argTypes: plekinfoCardArgTypes,
  args: plekinfoCardArgs,
  render: (args) => plekinfoCardTemplate(plekinfoCardArgsMapper(args, defaultSymbol())),
  decorators: [decorator],
};

export default meta;

export const Default: PlekinfoCardStory = {};

export const WithContent: PlekinfoCardStory = {
  render: (args) => plekinfoCardTemplate(plekinfoCardArgsMapper(args, defaultSymbol(), content())),
};

export const Static: PlekinfoCardStory = {
  args: {
    ...plekinfoCardArgs,
    href: "",
  },
};

export const WithSlideToggle: PlekinfoCardStory = {
  args: {
    ...plekinfoCardArgs,
    interaction: {
      checked: false,
      accessibleLabel: "sr-only label van het schuifje",
    },
  },
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
};

export const WithNameChange: PlekinfoCardStory = {
  args: {
    ...plekinfoCardArgs,
    heading: {
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
    heading: {
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
    heading: {
      value: "Bijbehorend bouwwerk bouwen",
    },
    interaction: {
      checked: false,
      accessibleLabel: "Schakel activiteit in of uit",
    },
  },
  render: (args) =>
    plekinfoCardTemplate({
      ...plekinfoCardBaseArgsMapper(args),
      items: withItemsContent(),
    }),
};

export const WithOmgevingsnormItems: PlekinfoCardStory = {
  args: {
    ...plekinfoCardArgs,
    heading: {
      value: "Maximale bouwhoogte",
    },
    interaction: {
      checked: false,
      accessibleLabel: "Schakel omgevingsnorm in of uit",
    },
  },
  render: (args) =>
    plekinfoCardTemplate({
      ...plekinfoCardBaseArgsMapper(args),
      items: omgevingsnormContent(),
    }),
};
