import { v4 as uuidv4 } from "uuid";
import { bindTemplate, componentArgs, createStories, StorybookParameters } from "../../storybook";

import { dropdownMenuArgsMapper, dropdownMenuArgTypes, DropdownMenuArgs } from "./dropdown-menu.args";
import * as content from './dropdown-menu.content';
import { DropdownMenu } from "./dropdown-menu.models";

export interface DropdownMenuParameters<TemplateFnReturnType> {
  dropdownMenuTemplate: (dropdownMenuProperties: DropdownMenu) => TemplateFnReturnType;
}

export function storiesOfDropdownMenu<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    dropdownMenuTemplate
  }: DropdownMenuParameters<TemplateFnReturnType>
) {
  const stories = createStories('Dropdown Menu', parameters, dropdownMenuArgTypes)
    .addParameters({
      args: {
        id: uuidv4()
      }
    });

  const template = bindTemplate(dropdownMenuArgsMapper, dropdownMenuTemplate);

  stories.add(
    'anchors',
    template,
    {
      args: componentArgs<Omit<DropdownMenuArgs, 'id'>>({
        buttonLabel: 'Versies',
        buttonVariant: 'secondary',
        isCheckable: true,
        dropdownAlign: "left",
        groups: content.versions
      })
    }
  );

  stories.add(
    'buttons',
    template,
    {
      args: componentArgs<Omit<DropdownMenuArgs, 'id'>>({
        buttonLabel: 'Opties',
        buttonVariant: 'secondary',
        isCheckable: false,
        dropdownAlign: "left",
        groups: content.settings
      })
    }
  );
}
