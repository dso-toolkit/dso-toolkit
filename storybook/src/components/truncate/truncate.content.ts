import { html } from "lit-html";

export const passendContent = html`Er is een kort label.`;

export const ingekortContent = html`
  Een heel lange omschrijving die niet past binnen de beschikbare ruimte en daarom wordt ingekort met een ellipsis.
`;

export const ingekortMetRenvooiContent = html`
  <dso-renvooi .value=${{ was: "vergunningplicht", wordt: "toegestaan" }}></dso-renvooi>
  in een heel lange omschrijving die niet past binnen de beschikbare ruimte.
`;

export const renvooiWijzigingNaLadenContent = html`
  <dso-renvooi .value=${{ was: "vergunningplicht", wordt: "toegestaan" }}></dso-renvooi>
  in een heel lange omschrijving die niet past binnen de beschikbare ruimte; de renvooiwaarde wordt na het laden
  bijgewerkt.
`;
