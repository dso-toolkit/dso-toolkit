import readme from "@dso-toolkit/core/src/components/hero-image/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { heroImageMeta, heroImageStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

const meta: Meta<object> = {
  ...heroImageMeta({ readme }),
  title: "Core/Hero Image",
};

export default meta;

const { Default } = heroImageStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { heroImageTemplate } = templates;

    return {
      heroImageTemplate,
    };
  },
});

export { Default };
