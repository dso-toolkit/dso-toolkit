import { MapLayerObject, RenvooiValue } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

const object1: MapLayerObject<TemplateResult> = {
  name: html`<span>Map layer object 1</span>`,
  symboolCode: "vszt030",
};

const object2: MapLayerObject<TemplateResult> = {
  active: true,
  name: html`<span>Map layer object 2 (Gebiedsoverschrijdingszone)</span>`,
  labelSlot: html`<dso-label slot="label" status="warning">Nieuw</dso-label>`,
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
  name: html`<dso-renvooi .value=${renvooiLabel}></dso-renvooi>`,
  symboolCode: "vszt030",
};

export function multipleMapLayerObjects(): MapLayerObject<TemplateResult>[] {
  return [object1, object2, object3];
}

export function singleMapLayerObject(): MapLayerObject<TemplateResult>[] {
  return [object1];
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
