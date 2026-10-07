import { Label } from "../label/label.models.js";

import { symbol } from "./plekinfo-card.content.js";
import { PlekinfoCardItem } from "./plekinfo-card.models.js";

function ontwerpLabel(): Label {
  return { status: "warning", compact: true, label: "Ontwerp" };
}

export function withItemsContent(): PlekinfoCardItem[] {
  return [
    {
      symbool: symbol("vgz023"),
      label: "vergunningplicht",
      sublabel: "in: bebouwde kom, industriezone, dijkgebied",
      meta: ontwerpLabel(),
    },
    {
      symbool: symbol("vszt030"),
      label: "verbod",
      sublabel: "in: buitengebied",
      meta: ontwerpLabel(),
      wijzigactie: "verwijder",
    },
    {
      symbool: symbol("vszt030"),
      label: "toegestaan",
      sublabel: "in: bebouwde kom, industriezone, dijkgebied",
      meta: ontwerpLabel(),
      wijzigactie: "voegtoe",
    },
    {
      symbool: symbol("vgz023"),
      label: { value: { was: "vergunningplicht", wordt: "toegestaan" } },
      sublabel: "in: ontwikkelzone",
      meta: ontwerpLabel(),
    },
  ];
}

export function omgevingsnormContent(): PlekinfoCardItem[] {
  return [
    {
      symbool: symbol("vgz023"),
      label: "10 meter",
    },
    {
      symbool: symbol("vgz023"),
      label: "12 meter",
      meta: ontwerpLabel(),
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
}
