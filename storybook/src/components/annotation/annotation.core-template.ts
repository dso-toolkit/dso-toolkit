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

        return html`
        <!-- Verhuizen naar decorator() -->
        <style>
          .symboolcode {
            background-color: #fff;
            display: block;
            float: left;
            height: 20px;
            margin-block-start: 2px;
            margin-inline-end: 8px;
            width: 24px;
            overflow: hidden;
            position: relative;
          }
          
          .symboolcode[data-symboolcode="vszt030"] {
            background-color: rgba(235, 225, 235, 0.5);
            border-width: 1px;
            border-color: #000001;
            border-style: solid;
          }

          .symboolcode[data-symboolcode="vag000"] {
            background-image: url(images/label-symbool.png);
            border-width: 1px;
            border-color: #000001;
            border-style: solid;
          }
        </style>

        <dso-annotation-activiteit
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
          .symboolCode=${symboolCode}
          .type=${type}
          .active=${active}
          @dsoActiveChange=${dsoActiveChange}
          .gewijzigdeLocatie=${gewijzigdeLocatie}
          .wijzigactie=${wijzigactie}
        ></dso-annotation>`;
      }

      if (annotation.type === "omgevingsnorm") {
        const { symboolCode, type, active, dsoActiveChange, gewijzigdeLocatie, wijzigactie } = annotation;

        return html`<dso-annotation-omgevingsnorm
          .symboolCode=${symboolCode}
          .type=${type}
          .active=${active}
          @dsoActiveChange=${dsoActiveChange}
          .gewijzigdeLocatie=${gewijzigdeLocatie}
          .wijzigactie=${wijzigactie}
        ></dso-annotation>`;
      }

      if (annotation.type === "werkingsgebied") {
        const { symboolCode, type, active, dsoActiveChange, gewijzigdeLocatie, wijzigactie } = annotation;

        return html`<dso-annotation-werkingsgebied
          .symboolCode=${symboolCode}
          .type=${type}
          .active=${active}
          @dsoActiveChange=${dsoActiveChange}
          .gewijzigdeLocatie=${gewijzigdeLocatie}
          .wijzigactie=${wijzigactie}
        ></dso-annotation>`;
      }

      throw new Error(`Unknown annotation type: ${JSON.stringify(annotation)}`);
    },
};
