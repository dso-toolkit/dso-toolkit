import { storiesOfAutosuggest, AutosuggestSuggestion } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/react";
import * as React from 'react';

import { AutosuggestTemplate } from "./autosuggest.template";
import readme from "./readme.md";

interface AutosuggestDemoTemplateProps {
  fetchSuggestions: (value: string) => AutosuggestSuggestion[];
  onSelect: (suggestion: CustomEvent<AutosuggestSuggestion>) => void;
  onChange: (value: CustomEvent<string>) => void;
  onSearch: (value: CustomEvent<string>) => void;
  suggestOnFocus: boolean;
  loading: boolean;
  loadingLabel: string;
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
          onChange={e => {
            this.props.onChange(e);

            this.setState(state => ({
              ...state,
              suggestions: this.props.fetchSuggestions(e.detail)
            }));
          }}
          onSelect={this.props.onSelect}
          onSearch={this.props.onSearch}
          suggestions={this.state.suggestions}
          suggestOnFocus={this.props.suggestOnFocus}
          loading={this.props.loading}
          loadingLabel={this.props.loadingLabel}
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
    autosuggestDemoTemplate: (fetchSuggestions, onSelect, onChange, onSearch, suggestOnFocus, loading, loadingLabel) => (
      <AutosuggestDemoTemplate
        fetchSuggestions={fetchSuggestions}
        onChange={onChange}
        onSelect={onSelect}
        onSearch={onSearch}
        suggestOnFocus={suggestOnFocus}
        loading={loading}
        loadingLabel={loadingLabel}
      />
    )
  }
);
