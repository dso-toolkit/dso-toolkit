import type { Meta } from "@storybook/react-vite";
import { IconButtonArgs, iconButtonMeta, iconButtonStories } from "dso-toolkit";
import icons from "dso-toolkit/storybook-assets/icons.json";

import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

const meta: Meta<IconButtonArgs> = {
  ...iconButtonMeta({ readme }),
  title: "Icon Button",
};

export default meta;

const { Map, Secondary, Tertiary } = iconButtonStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { iconButtonTemplate } = templates;

    return {
      iconButtonTemplate,
    };
  },
  icons,
});

export { Map, Secondary, Tertiary };
