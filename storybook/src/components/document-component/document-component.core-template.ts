import { DocumentComponent } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreDocumentComponent: ComponentImplementation<DocumentComponent<TemplateResult>> = {
  component: "documentComponent",
  implementation: "core",
  template: () =>
    function documentComponentTemplate({
      alternativeTitle,
      annotated,
      bevatOntwerpInformatie,
      children,
      dsoAnnotationToggle,
      dsoToggle,
      filtered,
      genesteOntwerpInformatie,
      gereserveerd,
      heading,
      inhoud,
      kop,
      label,
      notApplicable,
      nummer,
      open,
      openAnnotation,
      opschrift,
      type,
      vervallen,
      wijzigactie,
      annotationsWijzigactie,
      mark,
      mode,
      href,
      dsoMarkItemHighlight,
      dsoTableOfContentsClick,
    }) {
      return html`<dso-responsive-element class="dso-document-components">
        <dso-document-component
          ?annotated=${annotated}
          ?bevat-ontwerp-informatie=${bevatOntwerpInformatie}
          ?filtered=${filtered}
          ?geneste-ontwerp-informatie=${genesteOntwerpInformatie}
          ?gereserveerd=${gereserveerd}
          ?not-applicable=${notApplicable}
          ?open=${open}
          ?open-annotation=${openAnnotation}
          ?vervallen=${vervallen}
          .alternativeTitle=${ifDefined(alternativeTitle)}
          .heading=${heading}
          .inhoud=${ifDefined(inhoud)}
          .kop=${ifDefined(kop)}
          .nummer=${ifDefined(nummer)}
          .opschrift=${ifDefined(opschrift)}
          .label=${ifDefined(label)}
          .type=${type}
          .wijzigactie=${ifDefined(wijzigactie)}
          .annotationsWijzigactie=${ifDefined(annotationsWijzigactie)}
          .mark=${ifDefined(mark)}
          .mode=${ifDefined(mode)}
          .href=${ifDefined(href)}
          @dsoMarkItemHighlight=${ifDefined(dsoMarkItemHighlight)}
          @dsoAnnotationToggle=${ifDefined(dsoAnnotationToggle)}
          @dsoToggle=${ifDefined(dsoToggle)}
          @dsoTableOfContentsClick=${dsoTableOfContentsClick}
        >
          ${children}
        </dso-document-component>
      </dso-responsive-element>`;
    },
};
