import { Image } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

export function imageTemplate({ source, modifier, alt }: Image) {
  return html`
    <img src=${source} class=${ifDefined(modifier)} alt=${alt}>
  `;
}
