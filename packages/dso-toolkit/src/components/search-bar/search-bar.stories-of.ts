import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { componentArgs } from "../../storybook";
import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import { SearchBarArgs, searchBarArgTypes, searchBarArgsMapper } from "./search-bar.args.js";
import { SearchBar } from "./search-bar.models.js";

type SearchBarStory = StoryObj<SearchBarArgs, Renderer>;

interface SearchBarStories {
  VisualLabelWithIcon: SearchBarStory;
  VisualLabelWithoutIcon: SearchBarStory;
  PlaceholderWithLongText: SearchBarStory;
  HiddenLabelWithIcon: SearchBarStory;
  HiddenLabelWithoutIcon: SearchBarStory;
  WithValue: SearchBarStory;
  Invalid: SearchBarStory;
  HiddenButton: SearchBarStory;
  WithResultsMessage: SearchBarStory;
  WithHiddenResultsMessage: SearchBarStory;
}

interface SearchBarStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
  SearchBarTemplates<TemplateFnReturnType>
> {}

interface SearchBarTemplates<TemplateFnReturnType> {
  searchBarTemplate: (searchBarProperties: SearchBar) => TemplateFnReturnType;
}

export function searchBarMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  SearchBarArgs
> {
  return {
    argTypes: searchBarArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function searchBarStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: SearchBarStoriesParameters<Implementation, Templates, TemplateFnReturnType>): SearchBarStories {
  const render = templateContainer.render(storyTemplates, (args: SearchBarArgs, { searchBarTemplate }) =>
    searchBarTemplate(searchBarArgsMapper(args)),
  );

  const defaultArgs = componentArgs<SearchBarArgs>({
    id: "search-bar-id",
    label: "Label",
    icon: true,
    hiddenLabel: false,
    invalid: false,
    placeholder: "Bv. boomkap",
    value: "",
    buttonLabel: "Zoeken",
    hideSearchButton: false,
    ariaDescribedBy: "",
    ariaErrorMessage: "",
    resultsMessage: "",
    resultsHidden: false,
  });

  return {
    VisualLabelWithIcon: {
      args: defaultArgs,
      render,
    },
    VisualLabelWithoutIcon: {
      args: { ...defaultArgs, icon: false },
      render,
    },
    PlaceholderWithLongText: {
      args: {
        ...defaultArgs,
        placeholder:
          "Placeholder with long text, long text, long text. Placeholder with long text, long text, long text. Placeholder with long text, long text, long text. Placeholder with long text, long text, long text. Placeholder with long text, long text, long text. Placeholder with long text, long text, long text.",
      },
      render,
    },
    HiddenLabelWithIcon: {
      args: { ...defaultArgs, hiddenLabel: true },
      render,
    },
    HiddenLabelWithoutIcon: {
      args: { ...defaultArgs, hiddenLabel: true, icon: false },
      render,
    },
    WithValue: {
      args: { ...defaultArgs, value: "Laan van Eik en Duinen 155" },
      render,
    },
    Invalid: {
      args: {
        ...defaultArgs,
        invalid: true,
      },
      render,
    },
    HiddenButton: {
      args: {
        ...defaultArgs,
        hideSearchButton: true,
      },
      render,
    },
    WithResultsMessage: {
      args: {
        ...defaultArgs,
        resultsMessage: "7 gevonden resultaten",
      },
      render,
    },
    WithHiddenResultsMessage: {
      args: {
        ...defaultArgs,
        resultsMessage: "7 gevonden resultaten",
        resultsHidden: true,
      },
      render,
    },
  };
}
