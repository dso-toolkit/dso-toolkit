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
      badge,
      badgeStatus,
      badgeTooltip,
      children,
      dsoAnnotationToggle,
      dsoToggle,
      filtered,
      gereserveerd,
      heading,
      inhoud,
      kop,
      label,
      labelStatus,
      notApplicable,
      open,
      openAnnotation,
      type,
      vervallen,
      wijzigactie,
      annotationsWijzigactie,
      mark,
      ozonContentUrlResolver,
      ozonContentBegripResolver,
      mode,
      href,
      dsoMarkItemHighlight,
      dsoTableOfContentsClick,
      dsoOzonContentClick,
    }) {
      return html`<dso-responsive-element class="dso-document-components">
        <dso-document-component
          ?annotated=${annotated}
          .badge=${ifDefined(badge)}
          .badgeStatus=${ifDefined(badgeStatus)}
          .badgeTooltip=${ifDefined(badgeTooltip)}
          ?filtered=${filtered}
          .gereserveerd=${ifDefined(gereserveerd)}
          .label=${ifDefined(label)}
          .labelStatus=${ifDefined(labelStatus)}
          ?not-applicable=${notApplicable}
          ?open=${open}
          ?open-annotation=${openAnnotation}
          .vervallen=${ifDefined(vervallen)}
          .alternativeTitle=${ifDefined(alternativeTitle)}
          .heading=${heading}
          .inhoud=${ifDefined(inhoud)}
          .kop=${ifDefined(kop)}
          .type=${type}
          .wijzigactie=${ifDefined(wijzigactie)}
          .annotationsWijzigactie=${ifDefined(annotationsWijzigactie)}
          .mark=${ifDefined(mark)}
          .ozonContentUrlResolver=${ifDefined(ozonContentUrlResolver)}
          .ozonContentBegripResolver=${ifDefined(ozonContentBegripResolver)}
          .mode=${ifDefined(mode)}
          .href=${ifDefined(href)}
          @dsoOzonContentClick=${ifDefined(dsoOzonContentClick)}
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
