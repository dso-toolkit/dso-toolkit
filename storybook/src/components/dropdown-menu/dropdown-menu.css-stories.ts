import { Meta } from "@storybook/web-components";
import { dropdownMenuMeta, dropdownMenuStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/dropdown-menu/readme.md?raw";

import { templateContainer } from "../../templates";

const meta: Meta = {
  ...dropdownMenuMeta({ readme }),
  title: "HTML|CSS/Dropdown Menu",
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
