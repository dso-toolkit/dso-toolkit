import readme from "dso-toolkit/src/components/map-controls/readme.md?raw";
import { Meta, StoryObj } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { fn } from "storybook/test";

import { MapControlsArgs, mapControlsArgTypes, mapControlsArgsMapper } from "./map-controls.args.js";
import { baseLayers, overlays } from "./map-controls.content.js";
import { decorator } from "./map-controls.decorator.js";
import { mapControlsTemplate } from "./map-controls.template.js";

type MapControlsStory = StoryObj<MapControlsArgs>;

const meta: Meta<MapControlsArgs> = {
  title: "Core/Map Controls",
  argTypes: mapControlsArgTypes,
  args: {
    open: false,
    baseLayers: baseLayers(),
    overlays: overlays(),
    dsoToggleOverlay: fn(),
    dsoToggle: fn(),
    dsoZoomOut: fn(),
    dsoZoomIn: fn(),
    dsoBaseLayerChange: fn(),
  },
  decorators: [decorator],
  parameters: {
    html: {
      root: "#map-container-mock",
    },
    docs: {
      page: () => compiler(readme),
    },
  },
  render: (args) => mapControlsTemplate(mapControlsArgsMapper(args)),
};

export default meta;

export const MapControls: MapControlsStory = {
  parameters: {
    layout: "fullscreen",
  },
};
