import { MapLayerObject, RenvooiValue } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

const object1: MapLayerObject<TemplateResult> = {
  label: html`<span>Map layer object 1</span>`,
  symboolCode: "vszt030",
};

const object2: MapLayerObject<TemplateResult> = {
  active: true,
  label: html`<span>Map layer object 2 (Gebiedsoverschrijdingszone)</span>`,
  symboolCode: "vag000",
};

const renvooiLabel: RenvooiValue[] = [
  {
    was: "Droog",
    wordt: "Nat",
  },
  " gebied",
];

const object3: MapLayerObject<TemplateResult> = {
  active: true,
  label: html`<dso-renvooi .value=${renvooiLabel}></dso-renvooi>`,
  symboolCode: "vszt030",
};

export function multipleMapLayerObjects(): MapLayerObject<TemplateResult>[] {
  return [object1, object2, object3];
}

export function singleMapLayerObject(): MapLayerObject<TemplateResult>[] {
  return [object1];
}
