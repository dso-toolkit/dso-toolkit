import { storiesOfAutosuggest, AutosuggestSuggestion } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/react";
import * as React from 'react';

import { AutosuggestTemplate } from "./autosuggest.template";
import readme from "./readme.md";

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

class AutosuggestDemoTemplate extends React.Component<ConstructorParameters<typeof AutosuggestDemoTemplate>[0], AutosuggestDemoTemplateState> {
  constructor(props: AutosuggestDemoTemplateProps) {
    super(props);

    this.state = {
      suggestions: []
    };
  }

  render() {
    return (
      <>
        <label htmlFor="autosuggestInputId">Label voor input</label>
        <AutosuggestTemplate
          dsoChange={e => {
            this.props.dsoChange(e);

            this.setState(state => ({
              ...state,
              suggestions: this.props.fetchSuggestions(e.detail)
            }));
          }}
          dsoSelect={this.props.dsoSelect}
          dsoSearch={this.props.dsoSearch}
          suggestions={this.state.suggestions}
          suggestOnFocus={this.props.suggestOnFocus}
          loading={this.props.loading}
          loadingLabel={this.props.loadingLabel}
          loadingDelayed={this.props.loadingDelayed}
          notFoundLabel={this.props.notFoundLabel}
        >
          <input id="autosuggestInputId" type="text" className="form-control" />
        </AutosuggestTemplate>
        <pre>{JSON.stringify(this.state.suggestions, null, 2)}</pre>
      </>
    );
  }
}

storiesOfAutosuggest<JSX.Element>(
  {
    module,
    storiesOf,
    readme,
  },
  {
    autosuggestDemoTemplate: (fetchSuggestions, dsoSelect, dsoChange, dsoSearch, suggestOnFocus, loading, loadingLabel, loadingDelay, notFoundLabel) => (
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
    )
  }
);
