import readme from "@dso-toolkit/core/src/components/map-controls/readme.md?raw";
import type { Meta } from "@storybook/web-components";
import { MapControlsArgs, mapControlsMeta, mapControlsStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { decorator } from "./map-controls.decorator";

const meta: Meta<MapControlsArgs> = {
  ...mapControlsMeta({ readme }),
  title: "Core/Map Controls",
};

export default meta;

const { MapControls } = mapControlsStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { mapControlsTemplate } = templates;

    return {
      mapControlsTemplate,
    };
  },
  decorator,
});

export { MapControls };
