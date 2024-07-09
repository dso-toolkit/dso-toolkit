import { Meta } from "@storybook/react";

import { dropdownMenuMeta, dropdownMenuStories } from "dso-toolkit";

import readme from "./readme.md?raw";

import { templateContainer } from "../../templates";

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
