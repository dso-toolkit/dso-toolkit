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

export function storiesOfDropdownMenu<T>(
  { module: mainModule, storiesOf, readme }: StorybookParameters,
  {
    dropdownMenuTemplate,
  }: DropdownMenuParameters<T>
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
      buttonLabel: 'Opties',
      buttonVariant: 'secondary',
      dropdownAlign: "left",
      children: `
        <h2 class="dso-group-label">Versies</h2>
        <ul>
          <li>
            <a href="#">10.6.0</a>
          </li>
          <li>
            <a href="#">10.5.0</a>
          </li>
          <li>
            <a href="#">10.4.0</a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="#">master</a>
          </li>
        </ul>
        <h2 class="dso-group-label">Branch releases</h2>
        <ul>
          <li>
            <a href="#">#500-Margins-Testbuilds</a>
          </li>
          <li>
            <a href="#">#611-Pager-component-uitbreiden</a>
          </li>
          <li>
            <a href="#">#663-Dropdown-button-toegankelijk-maken</a>
          </li>
        </ul>`,
    },
  });
}
