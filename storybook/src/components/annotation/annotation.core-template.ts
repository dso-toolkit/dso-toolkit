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
          <span class="symboolcode" data-symboolcode=${symboolCode} slot="symbool"></span>
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
          <span class="symboolcode" data-symboolcode=${symboolCode} slot="symbool"></span>
        </dso-annotation-gebiedsaanwijzing>`;
      }

      if (annotation.type === "omgevingsnorm") {
        const { symboolCode, active, dsoActiveChange, gewijzigdeLocatie, wijzigactie, eenheid, naam, waardes } =
          annotation;

        return html`<dso-annotation-omgevingsnorm
          .active=${active}
          @dsoActiveChange=${dsoActiveChange}
          .gewijzigdeLocatie=${gewijzigdeLocatie}
          .wijzigactie=${wijzigactie}
          .eenheid=${eenheid}
          .naam=${naam}
          .waardes=${waardes}
        >
          <span class="symboolcode" data-symboolcode=${symboolCode} slot="symbool"></span>
        </dso-annotation-omgevingsnorm>`;
      }

      if (annotation.type === "werkingsgebied") {
        const { symboolCode, active, dsoActiveChange, gewijzigdeLocatie, wijzigactie, locatieNoemer } = annotation;

        return html`<dso-annotation-werkingsgebied
          .active=${active}
          @dsoActiveChange=${dsoActiveChange}
          .gewijzigdeLocatie=${gewijzigdeLocatie}
          .wijzigactie=${wijzigactie}
          .locatieNoemer=${locatieNoemer}
        >
          <span class="symboolcode" data-symboolcode=${symboolCode} slot="symbool"></span>
        </dso-annotation-werkingsgebied>`;
      }

      throw new Error(`Unknown annotation type: ${JSON.stringify(annotation)}`);
    },
};
