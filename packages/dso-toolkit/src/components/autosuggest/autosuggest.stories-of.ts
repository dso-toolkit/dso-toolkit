import { ComponentAnnotations, Renderer } from "@storybook/types";

import { AutosuggestArgs, autosuggestArgTypes } from "./autosuggest.args.js";
import { fetchSuggestions } from "./autosuggest.demo.js";
import { AutosuggestSuggestion } from "./autosuggest.models.js";

import { StoriesParameters, StoryObj } from "../../template-container";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface";

type AutosuggestStory = StoryObj<AutosuggestArgs, Renderer>;

interface AutosuggestStories {
  Example: AutosuggestStory;
  Minimal3Characters: AutosuggestStory;
  InSearchbar: AutosuggestStory;
}

interface AutosuggestStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    AutosuggestTemplates<TemplateFnReturnType>
  > {}

type AutosuggestTemplateFnType<TemplateFnReturnType> = (
  fetchSuggestions: (value: string) => AutosuggestSuggestion[],
  dsoSelect: (event: CustomEvent<AutosuggestSuggestion>) => void,
  dsoChange: (event: CustomEvent<string>) => void,
  dsoSearch: (event: CustomEvent<string>) => void,
  suggestOnFocus: boolean,
  loading: boolean,
  loadingLabel: string,
  loadingDelayed: number,
  notFoundLabel: string,
  minimalCharacters?: number,
) => TemplateFnReturnType;

export interface AutosuggestTemplates<TemplateFnReturnType> {
  autosuggestDemoTemplate: AutosuggestTemplateFnType<TemplateFnReturnType>;
  autosuggestInSearchBarTemplate: AutosuggestTemplateFnType<TemplateFnReturnType>;
}

export function autosuggestMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  AutosuggestArgs
> {
  return {
    argTypes: autosuggestArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function autosuggestStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: AutosuggestStoriesParameters<Implementation, Templates, TemplateFnReturnType>): AutosuggestStories {
  return {
    Example: {
      render: templateContainer.render(storyTemplates, (args, { autosuggestDemoTemplate }) =>
        autosuggestDemoTemplate(
          fetchSuggestions,
          args.dsoSelect,
          args.dsoChange,
          args.dsoSearch,
          args.suggestOnFocus,
          args.loading,
          args.loadingLabel,
          args.loadingDelayed,
          args.notFoundLabel,
        ),
      ),
    },
    Minimal3Characters: {
      render: templateContainer.render(storyTemplates, (args, { autosuggestDemoTemplate }) =>
        autosuggestDemoTemplate(
          fetchSuggestions,
          args.dsoSelect,
          args.dsoChange,
          args.dsoSearch,
          args.suggestOnFocus,
          args.loading,
          args.loadingLabel,
          args.loadingDelayed,
          args.notFoundLabel,
          3,
        ),
      ),
    },
    InSearchbar: {
      render: templateContainer.render(storyTemplates, (args, { autosuggestInSearchBarTemplate }) =>
        autosuggestInSearchBarTemplate(
          fetchSuggestions,
          args.dsoSelect,
          args.dsoChange,
          args.dsoSearch,
          args.suggestOnFocus,
          args.loading,
          args.loadingLabel,
          args.loadingDelayed,
          args.notFoundLabel,
        ),
      ),
    },
  };
}
