import type { Meta } from "@storybook/web-components";

import { templateContainer } from "../../templates";

import readme from "dso-toolkit/src/components/image/readme.md?raw";
import { ImageArgs, imageMeta, imageStories } from "dso-toolkit";

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

export { Default, Responsive, Circle };
