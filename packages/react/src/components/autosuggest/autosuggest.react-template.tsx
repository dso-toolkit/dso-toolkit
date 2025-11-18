import { Autosuggest } from "dso-toolkit";
import * as React from "react";
import { JSX } from "react";

import { DsoAutosuggest } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactAutosuggest: ComponentImplementation<Autosuggest<JSX.Element>> = {
  component: "autosuggest",
  implementation: "react",
  template: () =>
    function autosuggestTemplate({
      children,
      dsoChange,
      dsoSearch,
      dsoSelect,
      loading,
      suggestOnFocus,
      suggestions,
      loadingDelayed,
      loadingLabel,
      notFoundLabel,
      mark,
    }) {
      return (
        <DsoAutosuggest
          suggestions={suggestions}
          onDsoSelect={dsoSelect}
          onDsoChange={dsoChange}
          onDsoSearch={dsoSearch}
          suggestOnFocus={suggestOnFocus}
          loading={loading}
          loadingLabel={loadingLabel}
          loadingDelayed={loadingDelayed}
          notFoundLabel={notFoundLabel}
          mark={mark}
        >
          {children}
        </DsoAutosuggest>
      );
    },
};
