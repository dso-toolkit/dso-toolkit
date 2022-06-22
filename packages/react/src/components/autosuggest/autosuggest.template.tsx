import { Autosuggest } from "@dso-toolkit/sources";
import * as React from "react";

import { DsoAutosuggest } from "../..";

export class AutosuggestTemplate extends React.Component<React.PropsWithChildren<Autosuggest>> {
  render() {
    return (
      <DsoAutosuggest
        suggestions={this.props.suggestions}
        onDsoSelect={this.props.onSelect}
        onDsoChange={this.props.onChange}
        onDsoSearch={this.props.onSearch}
        suggestOnFocus={this.props.suggestOnFocus}
        loading={this.props.loading}
        loadingLabel={this.props.loadingLabel}
      >
        {this.props.children}
      </DsoAutosuggest>
    );
  }
}
