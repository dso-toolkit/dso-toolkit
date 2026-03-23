import componentsReadme from "@dso-toolkit/core/src/components/map-layer/components/readme.md?raw";
import readme from "@dso-toolkit/core/src/components/map-layer/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { MapLayerArgs, mapLayerMeta, mapLayerStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { labelSlotContent, multipleMapLayerObjects, nameSlotContent, singleMapLayerObject } from "./map-layer.content";
import { decorator } from "./map-layer.decorator";

const meta: Meta<MapLayerArgs> = {
  ...mapLayerMeta({ readme: `${readme}\n${componentsReadme}` }),
  title: "Core/Map Layer",
};

export default meta;

const { Multiple, Single, WithWijzigactie, WithLabel } = mapLayerStories(
  {
    templateContainer,
    storyTemplates: (templates) => {
      const { mapLayerTemplate } = templates;

      return {
        mapLayerTemplate,
        multiple: multipleMapLayerObjects(),
        single: singleMapLayerObject(),
        nameSlotContent: nameSlotContent(),
        wijzigactieNameSlotContent: nameSlotContent(true),
        labelSlotContent: labelSlotContent(),
      };
    },
  },
  decorator,
);

export { Multiple, Single, WithLabel, WithWijzigactie };
