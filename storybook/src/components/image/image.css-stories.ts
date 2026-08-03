import type { Meta } from "@storybook/web-components-vite";
import { ImageArgs, imageMeta, imageStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/image/readme.md?raw";

import { imageTemplate } from "./image.css-template";

const meta: Meta<ImageArgs> = {
  ...imageMeta({ readme }),
  title: "HTML|CSS/Image",
};

export default meta;

const { Default, Responsive, Circle } = imageStories({
  storyTemplates: () => {
    return {
      imageTemplate,
    };
  },
});

export { Circle, Default, Responsive };
