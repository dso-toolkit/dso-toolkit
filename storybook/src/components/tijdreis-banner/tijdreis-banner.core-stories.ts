import readme from "@dso-toolkit/core/src/components/tijdreis-banner/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { tijdreisBannerMeta, tijdreisBannerStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

const meta: Meta = {
  ...tijdreisBannerMeta({ readme }),
  title: "Core/Tijdreis Banner",
};

export default meta;

const { Default } = tijdreisBannerStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { tijdreisBannerTemplate } = templates;

    return {
      tijdreisBannerTemplate,
    };
  },
});

export { Default };
