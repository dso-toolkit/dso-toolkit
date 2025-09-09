import readme from "@dso-toolkit/core/src/components/icon-button/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { IconButtonArgs, iconButtonMeta, iconButtonStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

const icons: string[] = import.meta.env?.VITE_ICONS?.split(",") || [];

const meta: Meta<IconButtonArgs> = {
  ...iconButtonMeta({ readme }),
  title: "Core/Icon Button",
};

export default meta;

const { Secondary, Tertiary, Map } = iconButtonStories({
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
