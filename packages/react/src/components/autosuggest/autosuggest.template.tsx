import { Autosuggest } from "@dso-toolkit/sources";
import * as React from "react";

import { DsoAutosuggest } from "../..";

export class AutosuggestTemplate extends React.Component<Autosuggest> {
  render() {
    return (
      <DsoAutosuggest
        suggestions={this.props.suggestions}
        onDsoSelect={this.props.onSelect}
        onDsoChange={this.props.onChange}
        suggestOnFocus={this.props.suggestOnFocus}
      >
        {this.props.children}
      </DsoAutosuggest>
    );
  }
}
