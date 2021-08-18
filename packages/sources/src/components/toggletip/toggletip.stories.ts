import { bindTemplate, StorybookParameters } from "../../stories-helpers";

import { toggletipArgsMapper, toggletipArgTypes } from "./toggletip.args";
import { Toggletip } from "./toggletip.models";

export interface ToggletipParameters<TemplateFnReturnType> {
  toggletipTemplate: (
    toggletipProperties: Toggletip<TemplateFnReturnType>
  ) => TemplateFnReturnType;
  children: string;
}

export function storiesOfToggletip<TemplateFnReturnType>(
  { module: mainModule, storiesOf, readme }: StorybookParameters,
  { toggletipTemplate }: ToggletipParameters<TemplateFnReturnType>
) {
  const stories = storiesOf("Toggletip", mainModule).addParameters({
    docs: {
      page: readme,
    },
    argTypes: toggletipArgTypes,
  });

  stories.add(
    "Toggletip",
    bindTemplate(toggletipArgsMapper, toggletipTemplate),
    {
      args: {
        children: `
          <div class="dso-rich-content">
            <h2>Test</h2>
            <p>Hoi <a href="#daar">daar</a>.</p>
          </div>
        `,
      },
    }
  );
}
