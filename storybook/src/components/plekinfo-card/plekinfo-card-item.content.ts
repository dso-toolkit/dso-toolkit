import { html } from "lit-html";

import { PlekinfoCardItem } from "./plekinfo-card.models.js";

const symbol = (symbolCode: string) => html`<span class="symboolcode" data-symboolcode=${symbolCode}></span>`;
const meta = { status: "warning" as const, compact: true, label: "Ontwerp" };

export const withItemsContent: PlekinfoCardItem[] = [
  {
    symbool: symbol("vgz023"),
    label: "vergunningplicht",
    sublabel: "in: bebouwde kom, industriezone, dijkgebied",
    meta,
  },
  {
    symbool: symbol("vszt030"),
    label: "verbod",
    sublabel: "in: buitengebied",
    meta,
    wijzigactie: "verwijder",
  },
  {
    symbool: symbol("vszt030"),
    label: "toegestaan",
    sublabel: "in: bebouwde kom, industriezone, dijkgebied",
    meta,
    wijzigactie: "voegtoe",
  },
  {
    symbool: symbol("vgz023"),
    label: { value: { was: "vergunningplicht", wordt: "toegestaan" } },
    sublabel: "in: ontwikkelzone",
    meta,
  },
];

export const omgevingsnormContent: PlekinfoCardItem[] = [
  {
    symbool: symbol("vgz023"),
    label: "10 meter",
  },
  {
    symbool: symbol("vgz023"),
    label: "12 meter",
    meta,
  },
  {
    symbool: symbol("vgz023"),
    label: "14 meter",
  },
  {
    symbool: symbol("vgz023"),
    label: "18 meter",
  },
];
