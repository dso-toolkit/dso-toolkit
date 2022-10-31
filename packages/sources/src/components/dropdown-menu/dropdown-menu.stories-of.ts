import { v4 as uuidv4 } from "uuid";
import { componentArgs } from "../../storybook";
import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";

import { dropdownMenuArgsMapper, dropdownMenuArgTypes, DropdownMenuArgs } from "./dropdown-menu.args";
import * as content from "./dropdown-menu.content";
import { DropdownMenu } from "./dropdown-menu.models";

export interface DropdownMenuTemplates<TemplateFnReturnType> {
  dropdownMenuTemplate: (dropdownMenuProperties: DropdownMenu) => TemplateFnReturnType;
}

export function storiesOfDropdownMenu<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    DropdownMenuTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Dropdown Menu", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: dropdownMenuArgTypes,
      args: {
        id: uuidv4(),
      },
    });

    const template = templateMapper<DropdownMenuArgs>((args, { dropdownMenuTemplate }) =>
      dropdownMenuTemplate(dropdownMenuArgsMapper(args))
    );

    stories.add("anchors", template, {
      args: componentArgs<Omit<DropdownMenuArgs, "id">>({
        buttonLabel: "Versies",
        buttonVariant: "secondary",
        isCheckable: true,
        dropdownAlign: "left",
        groups: content.versions,
      }),
    });

    stories.add("buttons", template, {
      args: componentArgs<Omit<DropdownMenuArgs, "id">>({
        buttonLabel: "Opties",
        buttonVariant: "secondary",
        isCheckable: false,
        dropdownAlign: "left",
        groups: content.settings,
      }),
    });
  });
}
