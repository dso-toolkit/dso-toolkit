import { Meta } from "@storybook/react-vite";
import { dropdownMenuMeta, dropdownMenuStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

const meta: Meta = {
  ...dropdownMenuMeta({ readme }),
  title: "Dropdown Menu",
};

export default meta;

const { Anchors, Buttons } = dropdownMenuStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { dropdownMenuTemplate } = templates;

    return {
      dropdownMenuTemplate,
    };
  },
});

export { Anchors, Buttons };
