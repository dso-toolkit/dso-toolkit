import * as React from "react";

import { Templates } from "../../templates";

export function annotationContent({ selectableTemplate }: Templates) {
  return {
    title: <h2 slot="title">Annotaties</h2>,
    addons: selectableTemplate({
      type: "checkbox",
      id: "123",
      label: "Toon uitgebreide weergave",
      slot: "addons",
      value: "",
    }),
    content: (
      <div className="dso-rich-content">
        <h3>Locaties</h3>
        <span>Voorbeeld annotatie </span>
      </div>
    ),
  };
}
