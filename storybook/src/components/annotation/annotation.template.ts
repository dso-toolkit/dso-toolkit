import { DsoAnnotationActiviteitCustomEvent, DsoAnnotationKaartCustomEvent } from "@dso-toolkit/core";
import { html, nothing } from "lit-html";

import { assertNever } from "../../shared/assert-never.js";
import { labelTemplate } from "../label/label.template.js";

import { Annotation, AnnotationActiveChangeEvent, AnnotationKaartClickEvent } from "./annotation.models.js";

export function annotationTemplate(annotation: Annotation) {
  if (annotation.type === "activiteit") {
    const {
      locatieNoemers,
      naam,
      regelKwalificatie,
      symboolCode,
      active,
      dsoActiveChange,
      meta,
      regelKwalificatieVoorzetsel,
      wijzigactie,
    } = annotation;

    return html`<dso-annotation-activiteit
      .locatieNoemers=${locatieNoemers}
      .naam=${naam}
      .regelKwalificatie=${regelKwalificatie}
      .active=${active}
      @dsoActiveChange=${(e: DsoAnnotationActiviteitCustomEvent<AnnotationActiveChangeEvent>) => dsoActiveChange?.(e.detail)}
      .regelKwalificatieVoorzetsel=${regelKwalificatieVoorzetsel}
      .wijzigactie=${wijzigactie}
    >
      ${symboolCode ? html`<span class="symboolcode" data-symboolcode=${symboolCode} slot="symbool"></span>` : nothing}
      ${meta ? labelTemplate({ ...meta, slotName: "meta" }) : nothing}
    </dso-annotation-activiteit>`;
  }

  if (annotation.type === "gebiedsaanwijzing") {
    const { naam, symboolCode, active, dsoActiveChange, meta, wijzigactie } = annotation;

    return html`<dso-annotation-gebiedsaanwijzing
      .naam=${naam}
      .active=${active}
      @dsoActiveChange=${dsoActiveChange}
      .wijzigactie=${wijzigactie}
    >
      ${symboolCode ? html`<span class="symboolcode" data-symboolcode=${symboolCode} slot="symbool"></span>` : nothing}
      ${meta ? labelTemplate({ ...meta, slotName: "meta" }) : nothing}
    </dso-annotation-gebiedsaanwijzing>`;
  }

  if (annotation.type === "omgevingsnormwaarde") {
    const { symboolCode, toelichting, active, dsoActiveChange, meta, wijzigactie, eenheid, naam, waardes } = annotation;

    return html`<dso-annotation-omgevingsnormwaarde
      .active=${active}
      @dsoActiveChange=${dsoActiveChange}
      .toelichting=${toelichting}
      .wijzigactie=${wijzigactie}
      .eenheid=${eenheid}
      .naam=${naam}
      .waardes=${waardes}
    >
      ${symboolCode ? html`<span class="symboolcode" data-symboolcode=${symboolCode} slot="symbool"></span>` : nothing}
      ${meta ? labelTemplate({ ...meta, slotName: "meta" }) : nothing}
    </dso-annotation-omgevingsnormwaarde>`;
  }

  if (annotation.type === "locatie") {
    const { symboolCode, active, dsoActiveChange, meta, wijzigactie, locatieNoemer } = annotation;

    return html`<dso-annotation-locatie
      .active=${active}
      @dsoActiveChange=${dsoActiveChange}
      .wijzigactie=${wijzigactie}
      .locatieNoemer=${locatieNoemer}
    >
      ${symboolCode ? html`<span class="symboolcode" data-symboolcode=${symboolCode} slot="symbool"></span>` : nothing}
      ${meta ? labelTemplate({ ...meta, slotName: "meta" }) : nothing}
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
}
