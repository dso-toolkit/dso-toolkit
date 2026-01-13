import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import { AutosuggestArgs, autosuggestArgTypes } from "./autosuggest.args.js";
import { fetchSuggestionGroups, fetchSuggestions, mark } from "./autosuggest.demo.js";
import { AutosuggestMarkItem, AutosuggestSuggestion, AutosuggestSuggestionGroup } from "./autosuggest.models.js";

type AutosuggestStory = StoryObj<AutosuggestArgs, Renderer>;

interface AutosuggestStories {
  Example: AutosuggestStory;
  Minimal3Characters: AutosuggestStory;
  InSearchbar: AutosuggestStory;
  WithProvidedMarkFunction: AutosuggestStory;
  SuggestionGroups: AutosuggestStory;
}

interface AutosuggestStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
  AutosuggestTemplates<TemplateFnReturnType>
> {}

type AutosuggestTemplateFnType<TemplateFnReturnType> = (
  fetchSuggestions: (value: string) => AutosuggestSuggestion[] | AutosuggestSuggestionGroup[],
  dsoSelect: (event: CustomEvent<AutosuggestSuggestion>) => void,
  dsoChange: (event: CustomEvent<string>) => void,
  dsoSearch: (event: CustomEvent<string>) => void,
  loading: boolean,
  loadingLabel: string,
  loadingDelayed: number,
  notFoundLabel: string,
  minimalCharacters?: number,
  mark?: (
    suggestion: AutosuggestSuggestion,
    text: string,
    type: "value" | "type" | "extra",
    extraIndex?: number,
  ) => AutosuggestMarkItem[],
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
    args: {
      dsoSelect: fn(),
      dsoChange: fn(),
      dsoSearch: fn(),
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
          args.loading,
          args.loadingLabel,
          args.loadingDelayed,
          args.notFoundLabel,
        ),
      ),
    },
    WithProvidedMarkFunction: {
      render: templateContainer.render(storyTemplates, (args, { autosuggestInSearchBarTemplate }) =>
        autosuggestInSearchBarTemplate(
          fetchSuggestions,
          args.dsoSelect,
          args.dsoChange,
          args.dsoSearch,
          args.loading,
          args.loadingLabel,
          args.loadingDelayed,
          args.notFoundLabel,
          undefined,
          mark,
        ),
      ),
    },
    SuggestionGroups: {
      render: templateContainer.render(storyTemplates, (args, { autosuggestDemoTemplate }) =>
        autosuggestDemoTemplate(
          fetchSuggestionGroups,
          args.dsoSelect,
          args.dsoChange,
          args.dsoSearch,
          args.loading,
          args.loadingLabel,
          args.loadingDelayed,
          args.notFoundLabel,
        ),
      ),
    },
  };
}
