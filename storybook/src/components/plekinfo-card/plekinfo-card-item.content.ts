import { html } from "lit-html";

import { defaultSymbol } from "./plekinfo-card.content.js";
import { PlekinfoCardItem } from "./plekinfo-card.models.js";

const symbol = (symbolCode: string) => html`<span class="symboolcode" data-symboolcode=${symbolCode}></span>`;
const meta = { status: "warning" as const, compact: true, label: "Ontwerp" };

export const withItemsContent: PlekinfoCardItem[] = [
  {
    symbool: defaultSymbol(),
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
    symbool: defaultSymbol(),
    label: { value: { was: "vergunningplicht", wordt: "toegestaan" } },
    sublabel: "in: ontwikkelzone",
    meta,
  },
];

export const omgevingsnormContent: PlekinfoCardItem[] = [
  {
    symbool: defaultSymbol(),
    label: "vergunningplicht",
    sublabel: "in: bebouwde kom, industriezone, dijkgebied",
  },
  {
    symbool: defaultSymbol(),
    label: "toegestaan",
    sublabel: "in: ontwikkelzone",
    meta,
  },
  {
    symbool: defaultSymbol(),
    label: "verbod",
    sublabel: "in: buitengebied",
  },
];
