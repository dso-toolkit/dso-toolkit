import { Meta } from "@storybook/angular";

import { dropdownMenuMeta, dropdownMenuStories } from "dso-toolkit";

import readme from "./readme.md?raw";

import { templateContainer } from "../../templates";
import { DsoDropdownMenu } from "../../projects/component-library/src/public-api";

const meta: Meta = {
  ...dropdownMenuMeta({ readme }),
  component: DsoDropdownMenu,
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
