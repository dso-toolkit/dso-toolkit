import { ComponentAnnotations, Renderer } from "@storybook/types";
import { compiler } from "markdown-to-jsx";
import { v4 as uuidv4 } from "uuid";

import { componentArgs } from "../../storybook/index.js";
import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import { DropdownMenuArgs, dropdownMenuArgTypes, dropdownMenuArgsMapper } from "./dropdown-menu.args.js";
import * as content from "./dropdown-menu.content.js";
import { DropdownMenu } from "./dropdown-menu.models.js";

interface DropdownMenuStories {
  Anchors: StoryObj<DropdownMenuArgs, Renderer>;
  Buttons: StoryObj<DropdownMenuArgs, Renderer>;
}

interface DropdownMenuStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    DropdownMenuTemplates<TemplateFnReturnType>
  > {}

export interface DropdownMenuTemplates<TemplateFnReturnType> {
  dropdownMenuTemplate: (dropdownMenuProperties: DropdownMenu) => TemplateFnReturnType;
}

export function dropdownMenuMeta<TRenderer extends Renderer>({
  readme,
}: MetaOptions = {}): ComponentAnnotations<TRenderer> {
  return {
    argTypes: dropdownMenuArgTypes,
    args: {
      id: uuidv4(),
    },
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function dropdownMenuStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: DropdownMenuStoriesParameters<Implementation, Templates, TemplateFnReturnType>): DropdownMenuStories {
  return {
    Anchors: {
      args: componentArgs<Omit<DropdownMenuArgs, "id">>({
        buttonLabel: "Versies",
        buttonVariant: "secondary",
        isCheckable: true,
        dropdownAlign: "left",
        groups: content.versions,
        boundary: "#root",
        strategy: "auto",
      }),
      render: templateContainer.render(storyTemplates, (args, { dropdownMenuTemplate }) =>
        dropdownMenuTemplate(dropdownMenuArgsMapper(args)),
      ),
    },
    Buttons: {
      args: componentArgs<Omit<DropdownMenuArgs, "id">>({
        buttonLabel: "Opties",
        buttonVariant: "secondary",
        isCheckable: false,
        dropdownAlign: "left",
        groups: content.settings,
        boundary: "#root",
        strategy: "auto",
      }),
      render: templateContainer.render(storyTemplates, (args, { dropdownMenuTemplate }) =>
        dropdownMenuTemplate(dropdownMenuArgsMapper(args)),
      ),
    },
  };
}
