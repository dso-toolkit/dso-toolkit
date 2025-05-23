import { type Meta, moduleMetadata } from "@storybook/angular";
import { dropdownMenuMeta, dropdownMenuStories } from "dso-toolkit";

import { DsoDropdownMenu } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

const meta: Meta = {
  ...dropdownMenuMeta({ readme }),
  decorators: [
    moduleMetadata({
      imports: [DsoDropdownMenu],
    }),
  ],
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
