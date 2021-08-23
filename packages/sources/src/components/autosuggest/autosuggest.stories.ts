import { bindTemplate, StorybookParameters } from "../../stories-helpers";

import { autosuggestArgsMapper, autosuggestArgTypes } from "./autosuggest.args";
import { Autosuggest } from "./autosuggest.models";

export interface AutosuggestParameters<TemplateFnReturnType> {
  autosuggestTemplate: (
    autosuggestProperties: Autosuggest
  ) => TemplateFnReturnType;
}

export function storiesOfAutosuggest<TemplateFnReturnType>(
  { module: mainModule, storiesOf, readme }: StorybookParameters,
  { autosuggestTemplate }: AutosuggestParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(autosuggestArgsMapper, autosuggestTemplate);

  const stories = storiesOf("Autosuggest", mainModule).addParameters({
    docs: {
      page: readme,
    },
    argTypes: autosuggestArgTypes,
    args: {
      suggestOnFocus: false,
    },
  });

  stories.add("Autosuggest", template);
}
