import { bindTemplate, componentArgs, StorybookParameters } from "../../stories-helpers";

import { dropdownMenuArgsMapper, dropdownMenuArgTypes, DropdownMenuArgs } from "./dropdown-menu.args";
import * as content from './dropdown-menu.content';
import { DropdownMenuGroup, DropdownMenu } from "./dropdown-menu.models";

export interface DropdownMenuParameters<TemplateFnReturnType> {
  dropdownMenuTemplate: (dropdownMenuProperties: DropdownMenu<TemplateFnReturnType>) => TemplateFnReturnType;
  children: (content: DropdownMenuGroup[]) => TemplateFnReturnType;
}

export function storiesOfDropdownMenu<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    dropdownMenuTemplate,
    children
  }: DropdownMenuParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(dropdownMenuArgsMapper, dropdownMenuTemplate);

  const stories = storiesOf("Dropdown Menu", mainModule)
    .addParameters({
      docs: {
        page: readme,
      },
      argTypes: dropdownMenuArgTypes,
    });

  stories.add(
    'anchors',
    template,
    {
      args: componentArgs<DropdownMenuArgs<unknown>>({
        buttonLabel: 'Versies',
        buttonVariant: 'secondary',
        isCheckable: true,
        dropdownAlign: "left",
        children: children(content.versions)
      })
    }
  );

  stories.add(
    'buttons',
    template,
    {
      args: componentArgs<DropdownMenuArgs<unknown>>({
        buttonLabel: 'Opties',
        buttonVariant: 'secondary',
        isCheckable: false,
        dropdownAlign: "left",
        children: children(content.settings)
      })
    }
  );
}
