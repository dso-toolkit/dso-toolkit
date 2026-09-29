import { PlekinfoCardItem } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

const symbol = (symbolCode: string) => html`<span class="symboolcode" data-symboolcode=${symbolCode}></span>`;
const meta = { status: "warning" as const, compact: true, label: "Ontwerp" };

export const withItemsContent: PlekinfoCardItem<TemplateResult>[] = [
  {
    symbool: symbol("vgz023"),
    label: "vergunningplicht",
    sublabel: "in: bebouwde kom, industrie zone, dijkgebied",
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
    sublabel: "in: bebouwde kom, industrie zone, dijkgebied",
    meta,
    wijzigactie: "voegtoe",
  },
  {
    symbool: symbol("vgz023"),
    label: { value: { was: "vergunningplicht", wordt: "Toegestaan" } },
    sublabel: "in: ontwikkelzone",
    meta,
  },
  {
    symbool: symbol("vgz023"),
    label: "12 meter",
  },
  { symbool: symbol("vgz023"), label: "10 meter", meta },
];
