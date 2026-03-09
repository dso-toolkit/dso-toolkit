import readme from "@dso-toolkit/core/src/components/map-message/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { MapMessageArgs, mapMessageMeta, mapMessageStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

const meta: Meta<MapMessageArgs> = {
  ...mapMessageMeta({ readme }),
  title: "Core/Map Message",
};

export default meta;

const { Instruction, Success, Error } = mapMessageStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { mapMessageTemplate } = templates;
    return {
      mapMessageTemplate,
    };
  },
});

export { Error, Instruction, Success };
