import readme from "@dso-toolkit/core/src/components/map-controls/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { StoryObj } from "../../shared/story-obj.js";

import { MapControlsArgs, mapControlsArgTypes, mapControlsArgsMapper } from "./map-controls.args.js";
import { baseLayers, overlays } from "./map-controls.content.js";
import { decorator } from "./map-controls.decorator";
import { mapControlsDemoCss } from "./map-controls.demo";
import { mapControlsTemplate } from "./map-controls.template.js";

type MapControlsStory = StoryObj<MapControlsArgs, Renderer>;

const meta: Meta<MapControlsArgs> = {
  title: "Core/Map Controls",
  argTypes: mapControlsArgTypes,
  args: {
    open: false,
    baseLayers,
    overlays,
    dsoToggleOverlay: fn(),
    dsoToggle: fn(),
    dsoZoomOut: fn(),
    dsoZoomIn: fn(),
    dsoBaseLayerChange: fn(),
  },
  parameters: {
    html: {
      root: "#map-container-mock",
    },
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

const render = (args: MapControlsArgs) => mapControlsTemplate(mapControlsArgsMapper(args));

export const MapControls: MapControlsStory = {
  decorators: [(story) => decorator(story, mapControlsDemoCss)],
  parameters: {
    layout: "fullscreen",
  },
  render,
};
