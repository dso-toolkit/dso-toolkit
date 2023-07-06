import { DocumentComponent } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreDocumentComponent: ComponentImplementation<DocumentComponent<TemplateResult>> = {
  component: "documentFragment",
  implementation: "core",
  template: () =>
    function documentFragmentTemplate({
      children,
      heading,
      dsoToggle,
      open,
      filtered,
      suppressed,
      label,
      nummer,
      type,
      inhoud,
      opschrift,
    }) {
      return html`<dso-document-component
        type=${type}
        .inhoud=${inhoud}
        .opschrift=${opschrift}
        .title=${label}
        .nummer=${nummer}
        .heading=${heading}
        @dsoToggle=${ifDefined(dsoToggle)}
        ?open=${open}
        ?filtered=${filtered}
        ?suppressed=${suppressed}
      >
        ${children}
      </dso-document-component>`;
    },
};
