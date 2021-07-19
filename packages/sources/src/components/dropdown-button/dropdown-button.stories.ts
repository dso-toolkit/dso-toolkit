import { bindTemplate, StorybookParameters } from "../../stories-helpers";

import {
  dropdownButtonArgsMapper,
  dropdownButtonArgTypes,
} from "./dropdown-button.args";
import { DropdownButton } from "./dropdown-button.models";

export interface DropdownButtonParameters<TemplateFnReturnType> {
  dropdownButtonTemplate: (
    dropdownButtonProperties: DropdownButton
  ) => TemplateFnReturnType;
}

export function storiesOfDropdownButton<TemplateFnReturnType>(
  { module: mainModule, storiesOf, readme }: StorybookParameters,
  {
    dropdownButtonTemplate: dropdownButtonTemplate,
  }: DropdownButtonParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(
    dropdownButtonArgsMapper,
    dropdownButtonTemplate
  );

  const stories = storiesOf("Dropdown Button", mainModule).addParameters({
    docs: {
      page: readme,
    },
    argTypes: dropdownButtonArgTypes,
  });

  stories.add("Dropdown Button", template, {
    args: {
      label: "Button",
      variant: "primary",
    },
  });
}
