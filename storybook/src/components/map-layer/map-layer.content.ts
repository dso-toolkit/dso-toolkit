import { MapLayerObject, RenvooiValue } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

const object1: MapLayerObject<TemplateResult> = {
  label: html`<span>Map layer object 1</span>`,
  symboolCode: "vszt030",
};

const object2: MapLayerObject<TemplateResult> = {
  active: true,
  label: html`<span>Map layer object 2 (Gebiedsoverschrijdingszone)</span>`,
  badge: html`<dso-label slot="label" status="warning">Nieuw</dso-label>`,
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

export function nameSlotContent(): TemplateResult {
  return html`<span slot="name">Map layer</span>`;
}

export function wijzigactieNameSlotContent(): TemplateResult {
  return html`<dso-label slot="name" status="verwijderd">Label verwijderd</dso-label>
    <dso-label slot="name" status="toegevoegd">Label toegevoegd</dso-label>`;
}

export function labelSlotContent(): TemplateResult {
  return html`<dso-label slot="label" status="warning">Label</dso-label>`;
}
