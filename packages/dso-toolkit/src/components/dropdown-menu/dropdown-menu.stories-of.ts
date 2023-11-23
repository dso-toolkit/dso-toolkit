import { v4 as uuidv4 } from "uuid";
import { StoriesOfArguments, storiesOfFactory, componentArgs } from "../../storybook/index.js";

import { dropdownMenuArgsMapper, dropdownMenuArgTypes, DropdownMenuArgs } from "./dropdown-menu.args.js";
import * as content from "./dropdown-menu.content.js";
import { DropdownMenu } from "./dropdown-menu.models.js";

export interface DropdownMenuTemplates<TemplateFnReturnType> {
  dropdownMenuTemplate: (dropdownMenuProperties: DropdownMenu) => TemplateFnReturnType;
}

export function storiesOfDropdownMenu<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    DropdownMenuTemplates<TemplateFnReturnType>
  >,
) {
  return storiesOfFactory("Dropdown Menu", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: dropdownMenuArgTypes,
      args: {
        id: uuidv4(),
      },
    });

    const template = templateMapper<DropdownMenuArgs>((args, { dropdownMenuTemplate }) =>
      dropdownMenuTemplate(dropdownMenuArgsMapper(args)),
    );

    stories.add("anchors", template, {
      args: componentArgs<Omit<DropdownMenuArgs, "id">>({
        buttonLabel: "Versies",
        buttonVariant: "secondary",
        isCheckable: true,
        dropdownAlign: "left",
        groups: content.versions,
        boundary: "#root",
        strategy: "auto",
      }),
    });

    stories.add("buttons", template, {
      args: componentArgs<Omit<DropdownMenuArgs, "id">>({
        buttonLabel: "Opties",
        buttonVariant: "secondary",
        isCheckable: false,
        dropdownAlign: "left",
        groups: content.settings,
        boundary: "#root",
        strategy: "auto",
      }),
    });

    return stories;
  });
}
