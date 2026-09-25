import readme from "@dso-toolkit/core/src/components/map-message/readme.md?raw";
import { Meta, StoryObj } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";

import { MapMessageArgs, mapMessageArgTypes, mapMessageArgsMapper } from "./map-message.args.js";
import { mapMessageTemplate } from "./map-message.template.js";

type MapMessageStory = StoryObj<MapMessageArgs>;

const meta: Meta<MapMessageArgs> = {
  title: "Core/Map Message",
  argTypes: mapMessageArgTypes,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
  render: (args) => mapMessageTemplate(mapMessageArgsMapper(args)),
};

export default meta;

const parameters = {
  layout: "centered",
};

export const Instruction: MapMessageStory = {
  parameters,
  args: {
    variant: "instruction",
    message: "Dit is een instructie kaartbericht.",
  },
};

export const Success: MapMessageStory = {
  parameters,
  args: {
    variant: "success",
    message: "Dit is een succes kaartbericht.",
    buttons: [
      {
        label: "Ongedaan maken",
        icon: { icon: "undo" },
        variant: "secondary",
        type: "button",
        modifier: "dso-extra-small",
        iconMode: "after",
      },
      {
        label: "Volgende",
        icon: { icon: "chevron-right" },
        variant: "primary",
        type: "button",
        modifier: "dso-extra-small",
        iconMode: "after",
      },
    ],
  },
};

export const Error: MapMessageStory = {
  parameters,
  args: {
    variant: "error",
    message: "Dit is een fout kaartbericht.",
    buttons: [
      {
        label: "Sluiten",
        icon: { icon: "cross" },
        variant: "secondary",
        type: "button",
        modifier: "dso-extra-small",
        iconMode: "after",
      },
      {
        label: "Opnieuw proberen",
        icon: { icon: "undo" },
        variant: "primary",
        type: "button",
        modifier: "dso-extra-small",
        iconMode: "after",
      },
    ],
  },
};
