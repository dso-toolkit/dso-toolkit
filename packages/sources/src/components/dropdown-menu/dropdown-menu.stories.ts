import { bindTemplate, StorybookParameters } from "../../stories-helpers";

import {
  dropdownMenuArgsMapper,
  dropdownMenuArgTypes,
} from "./dropdown-menu.args";
import { DropdownMenu } from "./dropdown-menu.models";

export interface DropdownMenuParameters<TemplateFnReturnType> {
  dropdownMenuTemplate: (
    dropdownMenuProperties: DropdownMenu
  ) => TemplateFnReturnType;
}

export function storiesOfDropdownMenu<TemplateFnReturnType>(
  { module: mainModule, storiesOf, readme }: StorybookParameters,
  {
    dropdownMenuTemplate: dropdownMenuTemplate,
  }: DropdownMenuParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(dropdownMenuArgsMapper, dropdownMenuTemplate);

  const stories = storiesOf("Dropdown Menu", mainModule).addParameters({
    docs: {
      page: readme,
    },
    argTypes: dropdownMenuArgTypes,
  });

  stories.add("Dropdown Menu", template, {
    args: {
      dropdownAlign: "left",
    },
  });
}
