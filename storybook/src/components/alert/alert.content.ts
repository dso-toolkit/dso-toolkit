import { html } from "lit-html";
import { Templates } from "../../templates";

export const successMessage = html`<p>
  Dit is een succesmelding. Deze wordt getoond als een proces succesvol is afgerond.
</p>`;

export function infoMessage({ anchorTemplate }: Templates) {
  return html`<p>
    Dit is een informatiemelding. Deze wordt gebruikt voor
    ${anchorTemplate({ label: "aanvullende", url: "#", mode: "extern" })} informatie of tips.
  </p>`;
}

export const warningMessage = html`<p>Dit is een waarschuwingsmelding. Deze wordt gebruikt voor waarschuwingen.</p>`;

export function errorMessage({ anchorTemplate }: Templates) {
  return html`<p>
    Dit is een ${anchorTemplate({ label: "foutmelding", url: "#" })}. Deze wordt getoond als er iets is misgegaan.
  </p>`;
}

export const alertWithHeadingsContent = html`
  <h2>Dit is een H2</h2>
  <p>Dit is een informatiemelding. Deze wordt gebruikt voor aanvullende informatie of tips.</p>
  <h3>Dit is een H3</h3>
  <p>Dit is een informatiemelding. Deze wordt gebruikt voor aanvullende informatie of tips.</p>
  <h4>Dit is een H4</h4>
  <p>Dit is een informatiemelding. Deze wordt gebruikt voor aanvullende informatie of tips.</p>
  <h5>Dit is een H5</h5>
  <p>Dit is een informatiemelding. Deze wordt gebruikt voor aanvullende informatie of tips.</p>
  <h6>Dit is een H6</h6>
  <p>Dit is een informatiemelding. Deze wordt gebruikt voor aanvullende informatie of tips.</p>
`;
