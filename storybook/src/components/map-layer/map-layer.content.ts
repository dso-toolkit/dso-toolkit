import { TemplateResult, html } from "lit-html";

import { RenvooiValue } from "../renvooi/renvooi.models.js";

import { MapLayerObject } from "./map-layer.models.js";

function object1(): MapLayerObject {
  return {
    name: html`<span
      >Dit is een lange voorbeeldtekst om te testen hoe de kaartlaag omgaat met een langere naam die over meerdere
      regels loopt</span
    >`,
    symboolCode: "vszt030",
  };
}

function object2(): MapLayerObject {
  return {
    active: true,
    name: html`<span>Map layer object 2 (Gebiedsoverschrijdingszone)</span>`,
    labelSlot: html`<dso-label slot="label" status="warning">Nieuw</dso-label>`,
    symboolCode: "vag000",
  };
}

function renvooiLabel(): RenvooiValue[] {
  return [
    {
      was: "Droog",
      wordt: "Nat",
    },
    " gebied",
  ];
}

function object3(): MapLayerObject {
  return {
    active: true,
    name: html`<dso-renvooi .value=${renvooiLabel()}></dso-renvooi>`,
    symboolCode: "vszt030",
  };
}

export function multipleMapLayerObjects(): MapLayerObject[] {
  return [object1(), object2(), object3()];
}

export function singleMapLayerObject(): MapLayerObject[] {
  return [object1()];
}

export function nameSlotContent(wijzigactie?: boolean): TemplateResult {
  return wijzigactie
    ? html`<dso-renvooi
        slot="name"
        .value=${{
          was: "Label verwijderd",
          wordt: "Label toegevoegd",
        }}
      ></dso-renvooi>`
    : html`<span slot="name">Map layer</span>`;
}

export function labelSlotContent(): TemplateResult {
  return html`<dso-label slot="label" status="warning">Label</dso-label>`;
}
