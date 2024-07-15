import { Annotation, AnnotationKaartClickEvent } from "dso-toolkit";
import { html, nothing } from "lit-html";

import { ComponentImplementation } from "../../templates";
import {
  AnnotationActiveChangeEvent,
  DsoAnnotationActiviteitCustomEvent,
  DsoAnnotationKaartCustomEvent,
} from "@dso-toolkit/core";
import { assertNever } from "../../shared/assert-never";

export const coreAnnotation: ComponentImplementation<Annotation> = {
  component: "annotation",
  implementation: "core",
  template: () =>
    function annotation(annotation: Annotation) {
      if (annotation.type === "activiteit") {
        const {
          locatieNoemers,
          naam,
          regelKwalificatie,
          symboolCode,
          active,
          dsoActiveChange,
          gewijzigdeLocatie,
          regelKwalificatieVoorzetsel,
          wijzigactie,
        } = annotation;

        return html`<dso-annotation-activiteit
          .locatieNoemers=${locatieNoemers}
          .naam=${naam}
          .regelKwalificatie=${regelKwalificatie}
          .active=${active}
          @dsoActiveChange=${(e: DsoAnnotationActiviteitCustomEvent<AnnotationActiveChangeEvent>) =>
            dsoActiveChange?.(e.detail)}
          .gewijzigdeLocatie=${gewijzigdeLocatie}
          .regelKwalificatieVoorzetsel=${regelKwalificatieVoorzetsel}
          .wijzigactie=${wijzigactie}
        >
          ${symboolCode
            ? html`<span class="symboolcode" data-symboolcode=${symboolCode} slot="symbool"></span>`
            : nothing}
        </dso-annotation-activiteit>`;
      }

      if (annotation.type === "gebiedsaanwijzing") {
        const { naam, symboolCode, active, dsoActiveChange, gewijzigdeLocatie, wijzigactie } = annotation;

        return html`<dso-annotation-gebiedsaanwijzing
          .naam=${naam}
          .active=${active}
          @dsoActiveChange=${dsoActiveChange}
          .gewijzigdeLocatie=${gewijzigdeLocatie}
          .wijzigactie=${wijzigactie}
        >
          ${symboolCode
            ? html`<span class="symboolcode" data-symboolcode=${symboolCode} slot="symbool"></span>`
            : nothing}
        </dso-annotation-gebiedsaanwijzing>`;
      }

      if (annotation.type === "omgevingsnormwaarde") {
        const {
          symboolCode,
          toelichting,
          active,
          dsoActiveChange,
          gewijzigdeLocatie,
          wijzigactie,
          eenheid,
          naam,
          waardes,
        } = annotation;

        return html`<dso-annotation-omgevingsnormwaarde
          .active=${active}
          @dsoActiveChange=${dsoActiveChange}
          .gewijzigdeLocatie=${gewijzigdeLocatie}
          .toelichting=${toelichting}
          .wijzigactie=${wijzigactie}
          .eenheid=${eenheid}
          .naam=${naam}
          .waardes=${waardes}
        >
          ${symboolCode
            ? html`<span class="symboolcode" data-symboolcode=${symboolCode} slot="symbool"></span>`
            : nothing}
        </dso-annotation-omgevingsnormwaarde>`;
      }

      if (annotation.type === "locatie") {
        const { symboolCode, active, dsoActiveChange, gewijzigdeLocatie, wijzigactie, locatieNoemer } = annotation;

        return html`<dso-annotation-locatie
          .active=${active}
          @dsoActiveChange=${dsoActiveChange}
          .gewijzigdeLocatie=${gewijzigdeLocatie}
          .wijzigactie=${wijzigactie}
          .locatieNoemer=${locatieNoemer}
        >
          ${symboolCode
            ? html`<span class="symboolcode" data-symboolcode=${symboolCode} slot="symbool"></span>`
            : nothing}
        </dso-annotation-locatie>`;
      }

      if (annotation.type === "kaart") {
        const { wijzigactie, href, naam, dsoClick } = annotation;

        return html`<dso-annotation-kaart
          .naam=${naam}
          .wijzigactie=${wijzigactie}
          .href=${href}
          @dsoClick=${({ detail }: DsoAnnotationKaartCustomEvent<AnnotationKaartClickEvent>) => {
            detail.originalEvent.preventDefault();
            dsoClick(detail);
          }}
        ></dso-annotation-kaart>`;
      }

      assertNever(annotation);
      throw new Error(`Unknown annotation type: ${JSON.stringify(annotation)}`);
    },
};
