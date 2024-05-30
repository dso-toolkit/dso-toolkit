import { Annotation } from "dso-toolkit";
import { html } from "lit-html";

import { ComponentImplementation } from "../../templates";
import { AnnotationActiveChangeEvent, DsoAnnotationActiviteitCustomEvent } from "@dso-toolkit/core";

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
          type,
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
          .type=${type}
          .active=${active}
          @dsoActiveChange=${(e: DsoAnnotationActiviteitCustomEvent<AnnotationActiveChangeEvent>) => dsoActiveChange?.(e.detail)}
          .gewijzigdeLocatie=${gewijzigdeLocatie}
          .regelKwalificatieVoorzetsel=${regelKwalificatieVoorzetsel}
          .wijzigactie=${wijzigactie}
        >
          <span class="symboolcode" data-symboolcode=${symboolCode} slot="symbool"></span>
        </dso-annotation>`;
      }

      if (annotation.type === "gebiedsaanwijzing") {
        const { naam, symboolCode, type, active, dsoActiveChange, gewijzigdeLocatie, wijzigactie } = annotation;

        return html`<dso-annotation-gebiedsaanwijzing
          .naam=${naam}
          .type=${type}
          .active=${active}
          @dsoActiveChange=${dsoActiveChange}
          .gewijzigdeLocatie=${gewijzigdeLocatie}
          .wijzigactie=${wijzigactie}
        >
          <span class="symboolcode" data-symboolcode=${symboolCode} slot="symbool"></span>
        </dso-annotation>`;
      }

      if (annotation.type === "omgevingsnorm") {
        const { symboolCode, type, active, dsoActiveChange, gewijzigdeLocatie, wijzigactie, eenheid, naam, waardes } =
          annotation;

        return html`<dso-annotation-omgevingsnorm
          .type=${type}
          .active=${active}
          @dsoActiveChange=${dsoActiveChange}
          .gewijzigdeLocatie=${gewijzigdeLocatie}
          .wijzigactie=${wijzigactie}
          .eenheid=${eenheid}
          .naam=${naam}
          .waardes=${waardes}
        >
          <span class="symboolcode" data-symboolcode=${symboolCode} slot="symbool"></span>
        </dso-annotation>`;
      }

      if (annotation.type === "werkingsgebied") {
        const { symboolCode, type, active, dsoActiveChange, gewijzigdeLocatie, wijzigactie, locatieNoemers } =
          annotation;

        return html`<dso-annotation-werkingsgebied
          .type=${type}
          .active=${active}
          @dsoActiveChange=${dsoActiveChange}
          .gewijzigdeLocatie=${gewijzigdeLocatie}
          .wijzigactie=${wijzigactie}
          .locatieNoemers=${locatieNoemers}
        >
          <span class="symboolcode" data-symboolcode=${symboolCode} slot="symbool"></span>
        </dso-annotation>`;
      }

      throw new Error(`Unknown annotation type: ${JSON.stringify(annotation)}`);
    },
};
