import dropdownMenuGroupReadme from "@dso-toolkit/core/src/components/dropdown-menu/dropdown-menu-group/readme.md?raw";
import dropdownMenuItemReadme from "@dso-toolkit/core/src/components/dropdown-menu/dropdown-menu-item/readme.md?raw";
import readme from "@dso-toolkit/core/src/components/dropdown-menu/readme.md?raw";
import { Meta, StoryObj } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { fn } from "storybook/test";

import { DropdownMenuArgs, dropdownMenuArgTypes, dropdownMenuArgsMapper } from "./dropdown-menu.args.js";
import * as content from "./dropdown-menu.content.js";
import { decorator } from "./dropdown-menu.decorator.js";
import { dropdownMenuTemplate } from "./dropdown-menu.template.js";

type DropdownMenuStory = StoryObj<DropdownMenuArgs>;

const meta: Meta<DropdownMenuArgs> = {
  title: "Core/Dropdown Menu",
  argTypes: dropdownMenuArgTypes,
  decorators: [decorator],
  args: {
    buttonVariant: "secondary",
    dropdownMenuPosition: "left",
    dsoClick: fn(),
  },
  parameters: {
    docs: {
      page: () => compiler(`${readme}\n${dropdownMenuGroupReadme}\n${dropdownMenuItemReadme}`),
    },
  },
  render: (args) => dropdownMenuTemplate(dropdownMenuArgsMapper(args)),
};

export default meta;

export const Anchors: DropdownMenuStory = {
  args: {
    buttonLabel: "Versies",
    checkable: true,
    groups: content.versions(),
  },
};

export const Buttons: DropdownMenuStory = {
  args: {
    buttonLabel: "Opties",
    checkable: false,
    groups: content.settings(),
  },
};
