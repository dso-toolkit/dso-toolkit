import readme from "@dso-toolkit/core/src/components/map-message/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import { MapMessageArgs, mapMessageArgTypes, mapMessageArgsMapper } from "./map-message.args.js";
import { mapMessageTemplate } from "./map-message.template.js";

type MapMessageStory = StoryObj<MapMessageArgs, Renderer>;

const meta: Meta<MapMessageArgs> = {
  title: "Core/Map Message",
  argTypes: mapMessageArgTypes,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

const render = (args: MapMessageArgs) => mapMessageTemplate(mapMessageArgsMapper(args));
const parameters = {
  layout: "centered",
};

export const Instruction: MapMessageStory = {
  parameters,
  args: {
    variant: "instruction",
    message: "Dit is een instructie kaartbericht.",
  },
  render,
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
  render,
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
  render,
};
