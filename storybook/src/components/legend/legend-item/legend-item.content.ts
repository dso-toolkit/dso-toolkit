import { html } from "lit-html";

export const defaultSymbol = html`<span class="symboolcode" data-symboolcode="regelingsgebied"></span>`;

export const content = (label: string) => html`<span slot="label">${label}</span>`;
