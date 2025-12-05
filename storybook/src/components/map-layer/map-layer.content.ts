import { MapLayerObject } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

const object1: MapLayerObject<TemplateResult> = {
  label: html`<span>Map Layer Object 1</span>`,
  symboolCode: "vszt030",
};

const object2: MapLayerObject<TemplateResult> = {
  label: html`<span>Map Layer Object 2</span>`,
  symboolCode: "vag000",
};

export function multiple(): MapLayerObject<TemplateResult>[] {
  return [object1, object2];
}

export function single(): MapLayerObject<TemplateResult>[] {
  return [object1];
}
