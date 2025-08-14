import type { Meta } from "@storybook/web-components-vite";
import { ImageArgs, imageMeta, imageStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/image/readme.md?raw";

import { templateContainer } from "../../templates";

const meta: Meta<ImageArgs> = {
  ...imageMeta({ readme }),
  title: "HTML|CSS/Image",
};

export default meta;

const { Default, Responsive, Circle } = imageStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { imageTemplate } = templates;

    return {
      imageTemplate,
    };
  },
});

export { Circle, Default, Responsive };
