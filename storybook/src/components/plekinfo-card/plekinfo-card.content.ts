import { html } from "lit-html";

export function symbol(symboolcode: string) {
  return html`<span class="symboolcode" data-symboolcode=${symboolcode}></span>`;
}

export function defaultSymbol() {
  return symbol("vgz023");
}

export function content() {
  return html`<p>Compleet verstorende radaractiviteit met hoge intensiteit.</p>`;
}
