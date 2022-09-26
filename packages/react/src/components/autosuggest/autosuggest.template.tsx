import { Autosuggest } from "@dso-toolkit/sources";
import * as React from "react";

import { DsoAutosuggest } from "../..";

export class AutosuggestTemplate extends React.Component<React.PropsWithChildren<Autosuggest>> {
  render() {
    return (
      <DsoAutosuggest
        suggestions={this.props.suggestions}
        onDsoSelect={this.props.dsoSelect}
        onDsoChange={this.props.dsoChange}
        onDsoSearch={this.props.dsoSearch}
        suggestOnFocus={this.props.suggestOnFocus}
        loading={this.props.loading}
        loadingLabel={this.props.loadingLabel}
        loadingDelayed={this.props.loadingDelayed}
        notFoundLabel={this.props.notFoundLabel}
      >
        {this.props.children}
      </DsoAutosuggest>
    );
  }
}
