import { h } from "@stencil/core";

import { MapLayerWijzigactie } from "./map-layer.interfaces";

export function wrapWijzigactie(wijzigactie: MapLayerWijzigactie | undefined, content: unknown) {
  if (wijzigactie === "toegevoegd") return <ins>{content}</ins>;
  if (wijzigactie === "verwijderd") return <del>{content}</del>;
  return content;
}
