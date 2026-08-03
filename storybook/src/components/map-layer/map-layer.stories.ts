import componentsReadme from "@dso-toolkit/core/src/components/map-layer/components/readme.md?raw";
import readme from "@dso-toolkit/core/src/components/map-layer/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import { MapLayerArgs, mapLayerArgTypes, mapLayerArgs, mapLayerArgsMapper } from "./map-layer.args.js";
import {
  labelSlotContent,
  multipleMapLayerObjects,
  nameSlotContent,
  singleMapLayerObject,
} from "./map-layer.content.js";
import { decorator } from "./map-layer.decorator";
import { mapLayerTemplate } from "./map-layer.template.js";

type MapLayerStory = StoryObj<MapLayerArgs, Renderer>;

const meta: Meta<MapLayerArgs> = {
  title: "Core/Map Layer",
  argTypes: mapLayerArgTypes,
  args: mapLayerArgs,
  parameters: {
    docs: {
      page: () => compiler(`${readme}\n${componentsReadme}`),
    },
  },
};

export default meta;

export const Multiple: MapLayerStory = {
  decorators: [(story) => decorator(story)],
  render: (args) => mapLayerTemplate(mapLayerArgsMapper(args, multipleMapLayerObjects(), nameSlotContent())),
};

export const Single: MapLayerStory = {
  args: { ...mapLayerArgs, activatable: false },
  decorators: [(story) => decorator(story)],
  render: (args) => mapLayerTemplate(mapLayerArgsMapper(args, singleMapLayerObject(), nameSlotContent())),
};

export const WithWijzigactie: MapLayerStory = {
  args: { ...mapLayerArgs, wijzigactie: "voegtoe" },
  decorators: [(story) => decorator(story)],
  render: (args) => mapLayerTemplate(mapLayerArgsMapper(args, singleMapLayerObject(), nameSlotContent(true))),
};

export const WithLabel: MapLayerStory = {
  decorators: [(story) => decorator(story)],
  render: (args) =>
    mapLayerTemplate(mapLayerArgsMapper(args, singleMapLayerObject(), nameSlotContent(), labelSlotContent())),
};
