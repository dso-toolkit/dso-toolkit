import { Meta } from "@storybook/react";
import { AutosuggestArgs, autosuggestMeta, autosuggestStories, AutosuggestSuggestion } from "dso-toolkit";
import React from "react";

import readme from "./readme.md?raw";

import { templateContainer } from "../../templates";

const meta: Meta<AutosuggestArgs> = {
  ...autosuggestMeta({ readme }),
  title: "Autosuggest",
};

export default meta;

const { Example, Minimal3Characters, InSearchbar, WithProvidedMarkFunction } = autosuggestStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { autosuggestTemplate } = templates;

    interface AutosuggestDemoTemplateProps {
      fetchSuggestions: (value: string) => AutosuggestSuggestion[];
      dsoSelect: (suggestion: CustomEvent<AutosuggestSuggestion>) => void;
      dsoChange: (value: CustomEvent<string>) => void;
      dsoSearch: (value: CustomEvent<string>) => void;
      suggestOnFocus: boolean;
      loading: boolean;
      loadingLabel: string;
      loadingDelayed: number;
      notFoundLabel: string;
    }

    interface AutosuggestDemoTemplateState {
      suggestions: AutosuggestSuggestion[];
    }

    class AutosuggestDemoTemplate extends React.Component<
      ConstructorParameters<typeof AutosuggestDemoTemplate>[0],
      AutosuggestDemoTemplateState
    > {
      constructor(props: AutosuggestDemoTemplateProps) {
        super(props);

        this.state = {
          suggestions: [],
        };
      }

      render() {
        return (
          <>
            <label htmlFor="autosuggestInputId">Label voor input</label>
            {autosuggestTemplate({
              suggestions: this.state.suggestions,
              dsoSearch: this.props.dsoSearch,
              dsoSelect: this.props.dsoSelect,
              dsoChange: (e: CustomEvent<string>) => {
                this.props.dsoChange(e);

                this.setState((state) => ({
                  ...state,
                  suggestions: this.props.fetchSuggestions(e.detail),
                }));
              },
              suggestOnFocus: this.props.suggestOnFocus,
              loading: this.props.loading,
              loadingLabel: this.props.loadingLabel,
              loadingDelayed: this.props.loadingDelayed,
              notFoundLabel: this.props.notFoundLabel,
              children: <input id="autosuggestInputId" type="text" className="form-control" />,
            })}
            <pre>{JSON.stringify(this.state.suggestions, null, 2)}</pre>
          </>
        );
      }
    }

    return {
      autosuggestDemoTemplate: (
        fetchSuggestions,
        dsoSelect,
        dsoChange,
        dsoSearch,
        suggestOnFocus,
        loading,
        loadingLabel,
        loadingDelay,
        notFoundLabel,
      ) => (
        <AutosuggestDemoTemplate
          fetchSuggestions={fetchSuggestions}
          dsoChange={dsoChange}
          dsoSelect={dsoSelect}
          dsoSearch={dsoSearch}
          suggestOnFocus={suggestOnFocus}
          loading={loading}
          loadingLabel={loadingLabel}
          loadingDelayed={loadingDelay}
          notFoundLabel={notFoundLabel}
        />
      ),
      autosuggestInSearchBarTemplate: () => <p>Zie Web Component in Core.</p>,
      autosuggestMarkTemplate: () => <p>Zie Web Component in Core.</p>,
    };
  },
});

export { Example, Minimal3Characters, InSearchbar, WithProvidedMarkFunction };
