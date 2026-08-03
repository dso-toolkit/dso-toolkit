import dropdownMenuGroupReadme from "@dso-toolkit/core/src/components/dropdown-menu/dropdown-menu-group/readme.md?raw";
import dropdownMenuItemReadme from "@dso-toolkit/core/src/components/dropdown-menu/dropdown-menu-item/readme.md?raw";
import readme from "@dso-toolkit/core/src/components/dropdown-menu/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";
import { v4 as uuidv4 } from "uuid";

import { StoryObj } from "../../shared/story-obj.js";

import { DropdownMenuArgs, dropdownMenuArgTypes, dropdownMenuArgsMapper } from "./dropdown-menu.args.js";
import * as content from "./dropdown-menu.content.js";
import { dropdownMenuTemplate } from "./dropdown-menu.template.js";

type DropdownMenuStory = StoryObj<DropdownMenuArgs, Renderer>;

const meta: Meta<DropdownMenuArgs> = {
  title: "Core/Dropdown Menu",
  argTypes: dropdownMenuArgTypes,
  args: {
    id: uuidv4(),
  },
  parameters: {
    docs: {
      page: () => compiler(`${readme}\n${dropdownMenuGroupReadme}\n${dropdownMenuItemReadme}`),
    },
  },
};

export default meta;

export const Anchors: DropdownMenuStory = {
  args: {
    buttonLabel: "Versies",
    buttonVariant: "secondary",
    checkable: true,
    dropdownAlign: "left",
    groups: content.versions,
    dsoClick: fn(),
  },
  render: (args: DropdownMenuArgs) => dropdownMenuTemplate(dropdownMenuArgsMapper(args)),
};

export const Buttons: DropdownMenuStory = {
  args: {
    buttonLabel: "Opties",
    buttonVariant: "secondary",
    checkable: false,
    dropdownAlign: "left",
    groups: content.settings,
    dsoClick: fn(),
  },
  render: (args: DropdownMenuArgs) => dropdownMenuTemplate(dropdownMenuArgsMapper(args)),
};
