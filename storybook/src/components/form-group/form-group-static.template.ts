import { html, nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { iconButtonTemplate } from "../icon-button/icon-button.template.js";
import { infoTemplate } from "../info/info.template.js";
import { infoButtonTemplate } from "../info-button/info-button.template.js";

import { FormGroupStatic } from "./form-group-static.models.js";

export function formGroupStaticTemplate(formGroup: FormGroupStatic) {
  const labelId = `${formGroup.id}-label`;
  const valueId = `${formGroup.id}-value`;
  const infoTextId = `${formGroup.id}-info-text`;

  const ariaDescribedBy = [formGroup.info?.fixed ? infoTextId : undefined].filter((s) => !!s).join(" ") || undefined;

  const info = html`
    ${formGroup.info?.fixed === false && formGroup.infoButton ? infoButtonTemplate(formGroup.infoButton) : nothing}
    ${formGroup.info?.active ? infoTemplate({ ...formGroup.info, id: infoTextId }) : nothing}
  `;

  const editButton = formGroup.edit
    ? iconButtonTemplate({
        variant: "tertiary",
        label: "Edit",
        icon: "pencil",
      })
    : nothing;

  switch (formGroup.variant ?? "term-details") {
    case "huidig":
      return html`
        <div class="form-group dso-static ${classMap({ "dso-edit": !!formGroup.edit })}">
          <div class="dso-label-container">
            <label for=${formGroup.id} class="control-label">${formGroup.label}</label>
            ${info}
          </div>
          <div class="dso-field-container" aria-describedby=${ifDefined(ariaDescribedBy)}>
            ${formGroup.value} ${editButton}
          </div>
        </div>
      `;

    case "term-labelledby":
      return html`
        <div class="form-group dso-static ${classMap({ "dso-edit": !!formGroup.edit })}">
          <div class="dso-label-container">
            <span class="control-label" role="term" id=${labelId}>${formGroup.label}</span>
            ${info}
          </div>
          <div
            class="dso-field-container"
            role="definition"
            aria-labelledby=${labelId}
            aria-describedby=${ifDefined(ariaDescribedBy)}
          >
            ${formGroup.value} ${editButton}
          </div>
        </div>
      `;

    case "group":
      return html`
        <div
          class="form-group dso-static ${classMap({ "dso-edit": !!formGroup.edit })}"
          role="group"
          aria-labelledby=${labelId}
          aria-describedby=${ifDefined(ariaDescribedBy)}
        >
          <div class="dso-label-container">
            <span class="control-label" id=${labelId}>${formGroup.label}</span>
            ${info}
          </div>
          <div class="dso-field-container">${formGroup.value} ${editButton}</div>
        </div>
      `;

    case "fieldset":
      return html`
        <fieldset
          class="form-group dso-static ${classMap({ "dso-edit": !!formGroup.edit })}"
          aria-describedby=${ifDefined(ariaDescribedBy)}
        >
          <legend class="sr-only">${formGroup.label}</legend>
          <div class="dso-label-container">
            <span class="control-label" aria-hidden="true">${formGroup.label}</span>
            ${info}
          </div>
          <div class="dso-field-container">${formGroup.value} ${editButton}</div>
        </fieldset>
      `;

    case "dl":
      return html`
        <dl class="form-group dso-static ${classMap({ "dso-edit": !!formGroup.edit })}">
          <dt class="dso-label-container">
            <span class="control-label">${formGroup.label}</span>
            ${info}
          </dt>
          <dd class="dso-field-container" aria-describedby=${ifDefined(ariaDescribedBy)}>
            ${formGroup.value} ${editButton}
          </dd>
        </dl>
      `;

    case "span":
      return html`
        <div class="form-group dso-static ${classMap({ "dso-edit": !!formGroup.edit })}">
          <div class="dso-label-container">
            <span class="control-label">${formGroup.label}</span>
            ${info}
          </div>
          <div class="dso-field-container" aria-describedby=${ifDefined(ariaDescribedBy)}>
            ${formGroup.value} ${editButton}
          </div>
        </div>
      `;

    case "sr-only":
      return html`
        <div class="form-group dso-static ${classMap({ "dso-edit": !!formGroup.edit })}">
          <div class="dso-label-container">
            <span class="control-label" aria-hidden="true">${formGroup.label}</span>
            ${info}
          </div>
          <div class="dso-field-container" aria-describedby=${ifDefined(ariaDescribedBy)}>
            <span class="sr-only">${formGroup.label} </span>${formGroup.value} ${editButton}
          </div>
        </div>
      `;

    case "output":
      return html`
        <div class="form-group dso-static ${classMap({ "dso-edit": !!formGroup.edit })}">
          <div class="dso-label-container">
            <label for=${formGroup.id} class="control-label">${formGroup.label}</label>
            ${info}
          </div>
          <div class="dso-field-container">
            <output id=${formGroup.id} aria-describedby=${ifDefined(ariaDescribedBy)}>${formGroup.value}</output>
            ${editButton}
          </div>
        </div>
      `;

    case "readonly":
      return html`
        <div class="form-group dso-static ${classMap({ "dso-edit": !!formGroup.edit })}">
          <div class="dso-label-container">
            <label for=${formGroup.id} class="control-label">${formGroup.label}</label>
            ${info}
          </div>
          <div class="dso-field-container">
            <input
              type="text"
              id=${formGroup.id}
              class="form-control"
              readonly
              .value=${typeof formGroup.value === "string" ? formGroup.value : ""}
              aria-describedby=${ifDefined(ariaDescribedBy)}
            />
            ${editButton}
          </div>
        </div>
      `;

    case "term-details":
      return html`
        <div class="form-group dso-static ${classMap({ "dso-edit": !!formGroup.edit })}">
          <div class="dso-label-container">
            <span class="control-label" role="term" aria-details=${valueId}>${formGroup.label}</span>
            ${info}
          </div>
          <div
            class="dso-field-container"
            id=${valueId}
            role="definition"
            aria-describedby=${ifDefined(ariaDescribedBy)}
          >
            ${formGroup.value} ${editButton}
          </div>
        </div>
      `;
  }
}
